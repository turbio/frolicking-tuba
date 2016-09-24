const router = require('express').Router();
const annotate = require('./controllers/annotate');
const script = require('./controllers/script');

router.post('/annotate', annotate.create);
router.get('/script.js', script.get);

module.exports = router;
