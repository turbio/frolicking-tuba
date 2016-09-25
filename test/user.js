const chai = require('chai');
const server = require('../server/server');

describe('users', () => {
  describe('signup', () => {
    it('should POST to /api/signup', (done) => {
      chai.request(server)
        .post('/api/signup')
        .end((err, res) => {
          res.should.have.status(200);
          done(err);
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
