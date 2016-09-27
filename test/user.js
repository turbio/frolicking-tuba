const chai = require('chai');
const server = require('../server/server');
const User = require('../server/models/user');

describe('users', () => {
  beforeEach((done) => {
    User.sync({ force: true }).then(() => done());
  });

  describe('signup', () => {
    it('should create users', (done) => {
      chai.request(server)
        .post('/api/signup')
        .send({ email: 'test@email', password: 'password' })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.should.have.cookie('connect.sid');

          User.findAll({ email: 'test@email' }).then((users) => {
            users.length.should.eq(1);
            done(err);
          });
        });
    });
    it('should not allow multiple users with same email', (done) => {
      chai.request(server)
        .post('/api/signup')
        .send({ email: 'sameuser@email', password: 'samepassword' })
        .then((res) => {
          res.should.have.status(200);
          res.should.be.json;

          return chai.request(server)
            .post('/api/signup')
            .send({ email: 'sameuser@email', password: 'samepassword' });
        }).then((res) => done(res))
          .catch((res) => {
            done();
            res.should.have.status(400);
            User.findAll({ email: 'sameuser@email' }).then((users) => {
              users.length.should.eq(1);
            });
          });
    });
    it('should not allow blank email or password', (done) => {
      chai.request(server)
        .post('/api/signup')
        .send({ email: '', password: 'samepassword' })
        .then((res) => done(res))
        .catch((res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('signin', () => {
    it('should sign in user with correct credentials', (done) => {
      chai.request(server)
        .post('/api/signup')
        .send({ email: 'first@email', password: 'password' })
        .then((res) => {
          res.should.have.status(200);
          res.should.be.json;

          return chai.request(server)
            .post('/api/signin')
            .send({ email: 'first@email', password: 'password' });
        }).then((res) => {
          res.should.have.status(200);
          res.should.be.json;
          done();
        });
    });
    it('should not sign in user with incorrect credentials', (done) => {
      chai.request(server)
        .post('/api/signin')
        .send({ email: 'nota@user', password: 'fake' })
        .then((res) => {
          done(res);
        }).catch((res) => {
          res.should.not.have.cookie('connect.sid');
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('user info', () => {
    it('should not get user information without a session', (done) => {
      chai.request(server)
        .get('/api/me')
        .then((res) => {
          done(res);
        }).catch((res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});
