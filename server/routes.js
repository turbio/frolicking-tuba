const router = require('express').Router();

const user = require('./controllers/user');
const annotate = require('./controllers/annotate');
const script = require('./controllers/script');
const integration = require('./controllers/integration');

const githubIntegration = require('./integrations/github');

router.post('/api/annotate', annotate.create);

//user routes
router.post('/api/signup', user.signup);
router.post('/api/signin', user.signin);
router.get('/api/signout', user.signout);

//deprecate this at some point...
router.get('/api/me', user.info);

//integrations
router.get('/api/integrations', integration.getAll);
router.post('/api/integrations/github', githubIntegration.register);

router.get('/script.js', script.get);

module.exports = router;
