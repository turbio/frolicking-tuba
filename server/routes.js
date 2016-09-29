const router = require('express').Router();

const user = require('./controllers/user');
const annotate = require('./controllers/annotate');
const script = require('./controllers/script');
const integration = require('./controllers/integration');
const key = require('./controllers/key');

const githubIntegration = require('./integrations/github');

//deprecate this at some point...
//DEPRECATED
router.post('/api/signup', user.signup);
router.post('/api/signin', user.signin);
router.get('/api/signout', user.signout);
router.get('/api/me', user.info);

//user routes
router.post('/api/users/signup', user.signup);
router.post('/api/users/signin', user.signin);
router.get('/api/users/signout', user.signout);
router.get('/api/users/signedin', user.signedin);

//integrations
router.get('/api/integrations', integration.getAll);
router.get('/api/integrations/github', githubIntegration.redirectTo);
router.get('/api/integrations/github/repos', githubIntegration.repoList);
router.get('/api/integrations/github/auth', githubIntegration.register);

//keys
router.get('/api/keys', key.getAll);

//annotations
router.post('/api/annotate', annotate.create);

//special script serving
router.get('/script.js', script.get);

module.exports = router;
