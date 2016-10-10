const server = require('../server/server');
const session = require('supertest-session');
const User = require('../server/models/user');
const Integration = require('../server/models/integration');
const config = require('../env/config.json');
const http = require('http');

let mockhubToken = 'THISISATESTACCESSTOKEN';
const mockhubCode = 'THISISATESTCODE';
const mockhubRepos = [
  {
    name: 'first-test-repo',
    full_name: 'user/first-test-repo',
    description: 'this is the first test repo\'s description'
  },
  {
    name: 'second-test-repo',
    full_name: 'organization/second-test-repo',
    description: 'this is the second test repo\'s description'
  }
];

const queryParse = (str) =>
  str
    .split('&')
    .map((pair) => pair.split('='))
    .map((pair) => ({ [pair[0]]: pair[1] }))
    .reduce((join, pair) => Object.assign(join, pair), {});

const mockhubHandle = (req, res) => {
  let body = '';

  req.on('data', (data) => {
    body += data;
  });

  if (req.url === '/token_url') {
    req.on('end', () => {
      const parsedBody = queryParse(body);

      parsedBody.should.contain.keys('client_secret', 'code', 'client_id');
      parsedBody.code.should.eq(mockhubCode);


      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(`{ "access_token": "${mockhubToken}" }`);
    });
  } else if (req.url === '/api_url/user/repos') {
    if (req.headers.authorization === `token ${mockhubToken}`) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(mockhubRepos));
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'not sure what error github shows' }));
    }
  } else {
    throw new Error('should only access pre defined urls');
  }
};

const mockhub = (port) => {
  http.createServer(mockhubHandle).listen(port);
};

describe('github integration', () => { // eslint-disable-line max-statements
  let userRequest = null;

  before((done) => {
    Integration.sync({ force: true }).then(() => {
      done();
    });
  });

  before((done) => {
    User.sync({ force: true }).then(() => {
      done();
    });
  });

  before((done) => {
    //temporarily highjack the github post url
    //and start our owner server to mimick github
    //...maybe this is a bit overboard
    const githubPort = 1337;

    config.github.token_url = `http://localhost:${githubPort}/token_url`;
    config.github.api_url = `http://localhost:${githubPort}/api_url`;
    mockhub(githubPort);

    userRequest = session(server);
    userRequest
      .post('/api/signup')
      .send({ email: 'github-test-user', password: 'password' })
      .expect(200)
      .end(done);
  });

  it('should start users with no itegrations', (done) => {
    userRequest
      .get('/api/integrations')
      .expect(200)
      .end((err, res) => {
        res.body.should.eql([]);
        done(err);
      });
  });

  it('should 400 when trying to get repos without github auth', (done) => {
    userRequest
      .get('/api/integrations/github/repos')
      .expect(400)
      .end((err, res) => {
        res.body.should.eql({ error: config.messages.github_no_auth });
        done(err);
      });
  });

  it('integration path should redirect to github auth url', (done) => {
    userRequest
      .get('/api/integrations/github')
      .expect(302)
      .expect(
          'location',
          `${config.github.auth_url}`
          + `?client_id=${config.github.client_id}`
          + '&scope=repo')
      .end(done);
  });

  it('should create a github integration from GET', (done) => {
    userRequest
      .get(`/api/integrations/github/auth?code=${mockhubCode}`)
      .expect(302)
      .end(() => {
        done();
      });
  });

  it('should update user.ghtoken field after creation', (done) => {
    User.findOne({ where: { email: 'github-test-user' } })
    .then((user) => {
      user.ghtoken.should.eq(mockhubToken);
      done();
    });
  });

  it('should show github repo list', (done) => {
    userRequest
      .get('/api/integrations/github/repos')
      .expect(200)
      .end((err, res) => {
        res.body.should.eql(
          [mockhubRepos[0].full_name,
          mockhubRepos[1].full_name]);
        done(err);
      });
  });

  it('should not show github repo list if token becomes incorrect', (done) => {
    mockhubToken = 'NOLONGERVALID';

    userRequest
      .get('/api/integrations/github/repos')
      .expect(400)
      .end((err, res) => {
        res.body.should.eql({ error: config.messages.github_no_auth });
        done(err);
      });
  });
});
