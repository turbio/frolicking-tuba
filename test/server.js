const chai = require('chai');
const server = require('../server/server');

describe('server', () => {
  describe('/script.js', () => {
    it('should GET /script.js', (done) => {
      chai.request(server)
        .get('/script.js')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.have.header('content-type', /application\/javascript/);
          done(err);
        });
    });
  });

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
});
