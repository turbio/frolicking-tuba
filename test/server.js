const server = require('../server/server');
const request = require('supertest');
const Integration = require('../server/models/integration');

describe('server', () => {
  describe('static files', () => {
    it('should serve index.html at all urls', (done) => {
      request(server)
        .get('/fdajsklfdas')
        .expect('Content-Type', /html/)
        .expect(200)
        .then(() => {
          request(server)
            .get('/aaaaaaaaaa/a/a/a/aaaatest')
            .expect('Content-Type', /html/)
            .expect(200);
        }).then(() => {
          request(server)
            .get('/not_a_real_url')
            .expect('Content-Type', /html/)
            .expect(200)
            .end(done);
        });
    });
    it('should serve /index.html', (done) => {
      request(server)
        .get('/')
        .expect('Content-Type', /html/)
        .expect(200)
        .end(done);
    });
    it('should serve /bundle.js', (done) => {
      request(server)
        .get('/bundle.js')
        .expect('Content-Type', /javascript/)
        .expect(200)
        .end(done);
    });
  });

  describe('/script.js', () => {
    it('should GET /script.js with a key', (done) => {
      request(server)
        .get('/script.js?key=thisisthekey')
        .expect('Content-Type', /javascript/)
        .expect(200)
        .end(done);
    });
    it('should not GET /script.js without a key', (done) => {
      request(server)
        .get('/script.js')
        .expect(400)
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
