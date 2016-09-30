const server = require('../server/server');
const session = require('supertest-session');
const User = require('../server/models/user');
const Integration = require('../server/models/integration');
const config = require('../env/config.json');
const http = require('http');

const mockhubToken = 'THISISATESTACCESSTOKEN';
const mockhubCode = 'THISISATESTCODE';

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
  } else {
    throw new Error('should only access pre defined urls');
  }
};

const mockhub = (port) => {
  http.createServer(mockhubHandle).listen(port);
};

describe('github integration', () => {
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

  it('should show github integration after creation', (done) => {
    userRequest
      .get('/api/integrations')
      .expect(200)
      .end((err, res) => {
        res.body.should.eql([{ type: 'github' }]);
        Integration.findOne({ where: { meta: mockhubToken } })
          .then((integration) => {
            integration.should.not.be.null;
            integration.userId.should.eq(1);
            done(err);
          });
      });
  });

  it('should show github repo list');
  it('should allow users to select a repo');
});
