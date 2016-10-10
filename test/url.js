const server = require('../server/server');
const session = require('supertest-session');
const User = require('../server/models/user');
const Url = require('../server/models/url');

describe('url integration', () => { // eslint-disable-line max-statements
  let userRequest = null;

  before((done) => {
    User.sync({ force: true }).then(() => {
      done();
    });
  });

  before((done) => {
    Url.sync({ force: true }).then(() => {
      done();
    });
  });

  before((done) => {
    userRequest = session(server);
    userRequest
      .post('/api/signup')
      .send({ email: 'github-test-user', password: 'password' })
      .expect(200)
      .end(done);
  });

  it('should start users with no itegrations', (done) => {
    userRequest
      .get('/api/urls')
      .expect(200)
      .end((err, res) => {
        res.body.should.eql([]);
        done(err);
      });
  });

  it('should create a url', (done) => {
    userRequest
      .post('/api/urls')
      .send({ url: 'http://example.com' })
      .expect(200)
      .end(done);
  });

  it('should show url output list', (done) => {
    userRequest
      .get('/api/urls')
      .expect(200)
      .end((err, res) => {
        res.body[0].url.should.eq('http://example.com');
        done(err);
      });
  });
});
