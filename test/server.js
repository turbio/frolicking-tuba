const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');

chai.should();
chai.use(chaiHttp);

describe('server', () => {
  describe('/api/annotate', () => {
    it('should POST to /annotate', (done) => {
      chai.request(server)
        .post('/api/annotate')
        .end((err, res) => {
          res.should.have.status(200);
          done(err);
        });
    });
  });
  describe('/api/signup', () => {
    it('should POST to /api/signup', (done) => {
      chai.request(server)
        .post('/api/signup')
        .end((err, res) => {
          res.should.have.status(200);
          done(err);
        });
    });
  });
  describe('/api/signin', () => {
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
