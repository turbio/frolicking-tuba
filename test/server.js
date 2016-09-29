const server = require('../server/server');
const request = require('supertest');
const Integration = require('../server/models/integration');

describe('server', () => {
  describe('/script.js', () => {
    it('should GET /script.js', (done) => {
      request(server)
        .get('/script.js')
        .expect('Content-Type', /javascript/)
        .expect(200)
        .end(done);
    });
  });

  describe('/api/annotate', () => {
    Integration.create({ meta: 'NOTAREALTOKEN' })
      .then(() => {
        it('should POST to /annotate', (done) => {
          request(server)
            .post('/api/annotate')
            .expect(200)
            .end(done);
        });
      });
  });
});
