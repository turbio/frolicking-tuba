const server = require('../server/server');
const session = require('supertest-session');
const User = require('../server/models/user');
const config = require('../env/config.json');

describe('github integration', () => {
  let userRequest = null;

  before((done) => {
    User.sync({ force: true }).then(() => {
      userRequest = session(server);
      userRequest
        .post('/api/signup')
        .send({ email: 'github-test-user', password: 'password' })
        .expect(200)
        .end(done);
    });
  });

  it('should start users with no itegrations', (done) => {
    userRequest
      .get('/api/integrations')
      .expect(200)
      .end((req, res) => {
        res.body.should.eql([]);
        done();
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

  it('should create a github integration from get', (done) => {
    //temporarily highjack the github post url
    //config.github.token_url = 'localhost';

    userRequest
      .get('/api/integrations/github/auth?code=THISISATESTCODE')
      .expect(400)
      .end(done);
  });

  it('should show github integration after creation');
});
