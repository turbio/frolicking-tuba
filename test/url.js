const server = require('../server/server');
const session = require('supertest-session');
const User = require('../server/models/user');
const Integration = require('../server/models/integration');
const Output = require('../server/models/output');

describe('url integration', () => { // eslint-disable-line max-statements
  let userRequest = null;

  before((done) => {
    Integration.sync({ force: true }).then(() => {
      done();
    });
  });

  before((done) => {
    Output.sync({ force: true }).then(() => {
      done();
    });
  });

  before((done) => {
    User.sync({ force: true }).then(() => {
      done();
    });
  });

  before((done) => {
    userRequest = session(server);
    userRequest
      .post('/api/signup')
      .send({ email: 'github-test-user', password: 'password' })
      .expect(200)
      .end(done);
  });

  it('should start users with no itegrations', (done) => {
    userRequest
      .get('/api/integrations')
      .expect(200)
      .end((err, res) => {
        res.body.should.eql([]);
        done(err);
      });
  });

  it('should create a url integration', (done) => {
    userRequest
      .post('/api/integrations/urls')
      .send({ name: 'http://example.com' })
      .expect(200)
      .end(() => {
        done();
      });
  });

  it('should show url integration after creation', (done) => {
    userRequest
      .get('/api/integrations')
      .expect(200)
      .end((err, res) => {
        res.body.should.eql([{ type: 'url' }]);
        done(err);
      });
  });

  it('should show url output list', (done) => {
    userRequest
      .get('/api/integrations/url/urls')
      .expect(200)
      .end((err, res) => {
        res.body.should.eql(['http://example.com']);
        done(err);
      });
  });

  it('should allow users to select a url');
});
