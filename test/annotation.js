const server = require('../server/server');
const request = require('supertest');

describe('annotation', () => {
  it('should not POST to /annotate without key', (done) => {
    request(server)
      .post('/api/annotate')
      .expect(400)
      .end(done);
  });

  it('should POST to /annotate with key', (done) => {
    request(server)
      .post('/api/annotate')
      .send({
        key: 'XYZ',
        title: 'a test annotation',
        to: 'to user',
        from: 'from user',
        selected: 'this would be the selected text',
        comment: 'this is the comment'
      })
      .expect(200)
      .end(done);
  });
});
