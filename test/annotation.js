const Key = require('../server/models/key');
const User = require('../server/models/user');
const server = require('../server/server');
const request = require('supertest');
const config = require('../env/config.json');
const http = require('http');

describe('annotation', () => { // eslint-disable-line max-statements
  let apiKeyGithub = '';
  let apiKeyURL = '';

  const mockServerPort = 1338;
  const mockServerUrl = `http://localhost:${mockServerPort}`;
  const githubMockPath = '/github/repos/user/repo/issues';
  const urlMockPath = '/url';

  // run mock server
  before((done) => {
    const issues = [];
    const urlPosts = [];

    config.github.api_url = `${mockServerUrl}/github`;

    http.createServer((req, res) => { // eslint-disable-line max-statements
      console.log(`${req.method} to ${req.url}`);
      if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        if (req.url === githubMockPath) {
          res.end(JSON.stringify(issues));
        } else if (req.url === urlMockPath) {
          res.end(JSON.stringify(urlPosts));
        }
      } else if (req.method === 'POST') {
        let body = '';

        req.on('data', (data) => {
          body += data;
        });

        req.on('end', () => {
          body = JSON.parse(body);
          if (req.url === githubMockPath) {
            issues.push(body);
          } else if (req.url === urlMockPath) {
            urlPosts.push(body);
          }
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ issues: 'created' }));
        });
      }
    })
    .listen(mockServerPort, done);
  });

  //ooh, a pyramid
  before((done) => {
    // create test user and API keys
    let testUserId = null;

    User.create({
      email: 'testemail',
      password: 'testpass',
      ghtoken: 'GITHUBKEYHERE'
    })
    .then((user) => {
      testUserId = user.id;

      return Key.create({ userId: testUserId });
    })
    .then((key) => {
      apiKeyGithub = key.key;

      return Key.update({
        name: 'githubkey',
        type: 'github',
        endpoint: 'user/repo'
      }, { where: { key: apiKeyGithub } });
    })
    .then(() => Key.create({ userId: testUserId }))
    .then((key) => {
      apiKeyURL = key.key;

      return Key.update({
        name: 'urlkey',
        type: 'url',
        endpoint: `${mockServerUrl}/url`
      }, { where: { key: apiKeyURL } });
    })
    .then(() => done());
  });

  xit('should not POST to /annotate without key', (done) => {
    request(server)
      .post('/api/annotate')
      .field('title', 'a test annotation')
      .field('to', 'to user')
      .field('from', 'from user')
      .field('selected', 'this would be the selected text')
      .field('comment', 'this is the comment')
      .expect(400)
      .end(done);
  });

  const timeout1 = 5000;

  xit('should POST with attachment to /annotate with Github key', function(done) { // eslint-disable-line
    this.timeout(timeout1); // eslint-disable-line no-invalid-this
    request(server)
      .post('/api/annotate')
      .field('key', apiKeyGithub)
      .field('title', 'a test annotation')
      .field('to', 'to user')
      .field('from', 'from user')
      .field('selected', 'this would be the selected text')
      .field('comment', 'this is the comment')
      .attach('file', `${__dirname}/T1.png`)
      .expect(200)
      .end(done);
  });

  it('should POST without attachment to /annotate with Github key', function(done) { // eslint-disable-line
    this.timeout(timeout1); // eslint-disable-line no-invalid-this
    request(server)
      .post('/api/annotate')
      .field('key', apiKeyGithub)
      .field('title', 'a test annotation')
      .field('to', 'to user')
      .field('from', 'from user')
      .field('selected', 'this would be the selected text')
      .field('comment', 'this is the comment')
      .expect(200)
      .end(done);
  });

  xit('should create github issue when POST to /annotate', (done) => {
    request(mockServerUrl)
      .get(githubMockPath)
      .expect(200)
      .end((err, res) => {
        res.body[0].title.should.eql('a test annotation');
        done(err);
      });
  });

  it('should POST to /annotate with URL key', (done) => {
    request(server)
      .post('/api/annotate')
      .field('key', apiKeyURL)
      .field('title', 'a test annotation')
      .field('to', 'to user')
      .field('from', 'from user')
      .field('selected', 'this would be the selected text')
      .field('comment', 'this is the comment')
      .expect(200)
      .end(done);
  });

  xit('should should be able to POST to mock server /url', (done) => {
    request(mockServerUrl)
      .post('/url')
      .send({
        title: 'a test annotation',
        to: 'to user',
        from: 'from user',
        selected: 'this would be the selected text',
        comment: 'this is the comment'
      })
      .expect(200)
      .end(done);
  });

  xit('should make POST request to a URL when POST to /annotate', (done) => {
    request(mockServerUrl)
      .get('/url')
      .expect(200)
      .end((err, res) => {
        res.body[0].title.should.eql('a test annotation');
        done(err);
      });
  });
});
