const Key = require('../server/models/key');
const Integration = require('../server/models/integration');
const Output = require('../server/models/output');
const server = require('../server/server');
const request = require('supertest');

describe('annotation', () => {
  let apiKey = '';

  before((done) => {
    Output.sync({ force: true })
      .then(() => Key.sync({ force: true }))
      .then(() => Integration.sync({ force: true }))
      .then(() => done());
  });

  //ooh, a pyramid
  before((done) => {
    Key.create().then((key) => {
      Integration.create({ meta: 'GITHUBKEYHERE' }).then((integration) => {
        apiKey = key.key;
        Output.create({
          keyId: key.id,
          integrationId: integration.id,
          meta: 'user/repo'
        }).then(() => done());
      });
    });
  });

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
        key: apiKey,
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
