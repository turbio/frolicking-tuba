const server = require('../server/server');
const User = require('../server/models/user');
const request = require('supertest');
const session = require('supertest-session');

describe('users', () => {
  let signedinRequest = null;
  let testCount = 0;

  before((done) => {
    User.sync({ force: true }).then(() => {
      done();
    });
  });

  beforeEach((done) => {
    testCount++;

    signedinRequest = session(server);
    signedinRequest
      .post('/api/signup')
      .send({ email: `persist-test-${testCount}`, password: 'persist' })
      .end(done);
  });

  describe('signup', () => {
    it('should create users', (done) => {
      request(server)
        .post('/api/signup')
        .send({ email: 'signup-test', password: 'password' })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(done);
    });
    it('should not allow multiple users with same email', (done) => {
      request(server)
        .post('/api/signup')
        .send({ email: 'signup-test', password: 'different password' })
        .expect(400)
        .end(done);
    });
    it('should not allow blank email or password', (done) => {
      request(server)
        .post('/api/signup')
        .send({ email: '', password: 'samepassword' })
        .expect(400)
        .end(done);
    });
  });

  describe('signin', () => {
    const sessionRequest = session(server);

    it('should create user to sign in', (done) => {
      request(server)
        .post('/api/signup')
        .send({ email: 'test_email', password: 'test_password' })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(done);
    });
    it('should not be logged in at this point', (done) => {
      sessionRequest.get('/api/me').expect(400).end(done);
    });
    it('should sign in using same credentials', (done) => {
      sessionRequest.post('/api/signin')
        .send({ email: 'test_email', password: 'test_password' })
        .end(done);
    });
    it('should verify that session exists', (done) => {
      sessionRequest.get('/api/me').expect(200).end(done);
    });
    it('should not sign in user with incorrect credentials', (done) => {
      request(server)
        .post('/api/signin')
        .send({ email: 'nota@user', password: 'fake' })
        .expect(400)
        .end(done);
    });
  });

  describe('signout', () => {
    const sessionRequest = session(server);

    it('should create an initial session', (done) => {
      sessionRequest
        .post('/api/signup')
        .send({ email: 'signout-test', password: 'signout-test' })
        .end(done);
    });
    it('should verify session exists', (done) => {
      sessionRequest
        .get('/api/me')
        .expect(200)
        .end(done);
    });
    it('should remove session', (done) => {
      sessionRequest
        .get('/api/signout')
        .expect(200)
        .end(done);
    });
    it('should verify session was removed', (done) => {
      sessionRequest
        .get('/api/me')
        .expect(400)
        .end(done);
    });
  });

  describe('user info', () => {
    it('should get user information with a session', (done) => {
      signedinRequest
        .get('/api/me')
        .expect(200)
        .end(done);
    });
    it('should not get user information without a session', (done) => {
      request(server)
        .get('/api/me')
        .expect(400)
        .end(done);
    });
  });

  describe('integrations', () => {
  });
});
