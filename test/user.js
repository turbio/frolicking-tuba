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
            res.should.be.json;
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
    it('should POST to /api/signin', (done) => {
      chai.request(server)
        .post('/api/signin')
        .end((err, res) => {
          res.should.have.status(200);
          done(err);
        });
    });
  });
});
