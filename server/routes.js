const express = require('express');
const router = express.Router();

const annotate = require('./controllers/annotate');

router.post('/annotate', annotate.create);

module.exports = router;
