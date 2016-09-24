const router = require('express').Router();

const user = require('./controllers/user');
const annotate = require('./controllers/annotate');
const script = require('./controllers/script');

router.post('/api/annotate', annotate.create);
router.post('/api/signup', user.signup);
router.post('/api/signin', user.signin);

router.get('/script.js', script.get);

module.exports = router;
