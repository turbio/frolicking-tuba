const server = require('../server/server');
const User = require('../server/models/user');
const request = require('supertest');

describe('users', () => {
  beforeEach((done) => {
    User.sync({ force: true }).then(() => done());
  });

  describe('signup', () => {
    it('should create users', (done) => {
      request(server)
        .post('/api/signup')
        .send({ email: 'test@email', password: 'password' })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err) => {
          User.findAll({ email: 'test@email' }).then((users) => {
            users.length.should.eq(1);
            done(err);
          });
        });
    });
    it('should not allow multiple users with same email', (done) => {
      request(server)
        .post('/api/signup')
        .send({ email: 'sameuser@email', password: 'samepassword' })
        .expect(200)
        .expect('Content-Type', /json/)
        .then(() =>
          request(server)
            .post('/api/signup')
            .send({ email: 'sameuser@email', password: 'samepassword' })
            .expect(400)
            .then(() => done()))
        .catch(done);
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
    it('should sign in user with correct credentials', (done) => {
      request(server)
        .post('/api/signup')
        .send({ email: 'first@email', password: 'password' })
        .expect(200)
        .expect('Content-Type', /json/)
        .then(() =>
          request(server)
            .post('/api/signin')
            .send({ email: 'first@email', password: 'password' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(() => done()))
        .catch(done);
    });
    it('should not sign in user with incorrect credentials', (done) => {
      request(server)
        .post('/api/signin')
        .send({ email: 'nota@user', password: 'fake' })
        .expect(400)
        .end(done);
    });
  });
  describe('user info', () => {
    it('should not get user information without a session', (done) => {
      request(server)
        .get('/api/me')
        .expect(400)
        .end(done);
    });
  });
});
