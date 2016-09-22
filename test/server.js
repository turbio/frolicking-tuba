const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');

chai.should();
chai.use(chaiHttp);

describe('server', () => {
  describe('POST /annotate', () => {
    it('should POST to /annotate', (done) => {
      chai.request(server)
        .post('/annotate')
        .end((err, res) => {
          res.should.have.status(200);
          done(err);
        });
    });
  });
});
