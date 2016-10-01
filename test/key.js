const server = require('../server/server');
const session = require('supertest-session');
const request = require('supertest');
const User = require('../server/models/user');
const Key = require('../server/models/key');
const config = require('../env/config.json');

// eslint-disable-next-line max-statements
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
        console.log('GET KEYS ERROR:', err);
        res.body.should.be.an('array');
        done(err);
      });
  });

  it('should not show the keys if no user is logged in', (done) => {
    request(server)
      .get('/api/keys')
      .expect(400)
      .end((err, res) => {
        res.body.should.eql({ error: config.messages.not_logged_in });
        done(err);
      });
  });

  it('should show no keys for new user', (done) => {
    userRequest
      .get('/api/keys')
      .expect(200)
      .end((err, res) => {
        res.body.should.be.an('array');
        res.body.length.should.eq(0);
        done(err);
      });
  });

  it('should generate a new key for a user', (done) => {
    userRequest
      .post('/api/keys')
      .end((err, res) => {
        res.body.should.be.an('object');
        done(err);
      });
  });

  it('should show new keys for user', (done) => {
    userRequest
      .get('/api/keys')
      .end((err, res) => {
        res.body.should.be.an('array');
        res.body.length.should.eq(1);
        done(err);
      });
  });

  it('should have "name" property for key', (done) => {
    userRequest
      .get('/api/keys')
      .end((err, res) => {
        res.body[0].name.should.be.a('string');
        done(err);
      });
  });

  it('should have "api_key" property for key', (done) => {
    userRequest
      .get('/api/keys')
      .end((err, res) => {
        res.body[0].api_key.should.be.a('string');
        done(err);
      });
  });

  it('should have "endpoint" property for key', (done) => {
    userRequest
      .get('/api/keys')
      .end((err, res) => {
        res.body[0].endpoint.should.be.a('string');
        done(err);
      });
  });

  it('should not generate a new key when no user', (done) => {
    request(server)
      .post('/api/keys')
      .expect(400)
      .end((err, res) => {
        res.body.should.eql({ error: config.messages.not_logged_in });
        done(err);
      });
  });
});
