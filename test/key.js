
const server = require('../server/server');
const session = require('supertest-session');
const User = require('../server/models/user');
const Key = require('../server/models/key');

describe('keys', () => {
  let userRequest = null;

  before((done) => {
    Key.sync({ force: true }).then(() => {
      done();
    });
  });

  before((done) => {
    User.sync({ force: true }).then(() => {
      done();
    });
  });

  before((done) => {
    userRequest = session(server);
    userRequest
      .post('/api/signup')
      .send({ email: 'key-test-user', password: 'password' })
      .expect(200)
      .end(done);
  });

  it('should show the keys for a user', (done) => {
    userRequest
      .get('/api/keys')
      .expect(200)
      .end((err, res) => {
        res.body.should.eql([]);
        done(err);
      });
  });

  it('should not show the keys if no user is logged in');
  it('should show no keys for new user');
  it('should generate a new key for a user');
  it('should show news keys for user');
  it('should not generate a new key when no user');
});
