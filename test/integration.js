const server = require('../server/server');
const session = require('supertest-session');
const User = require('../server/models/user');

describe('integrations', () => {
  let userRequest = null;

  before((done) => {
    User.sync({ force: true }).then(() => {
      userRequest = session(server);
      userRequest
        .post('/api/signup')
        .send({ email: 'integrations-test-user', password: 'password' })
        .expect(200)
        .end(done);
    });
  });

  it('should show all integrations of a user', (done) => {
    userRequest
      .get('/api/integrations')
      .expect(200)
      .end((req, res) => {
        res.body.should.eql([]);
        done();
      });
  });

  it('should create an integration from post');
});
