const github = require('../integrations/github');
const config = require('../../env/config.json');

module.exports.allowCORS = (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept'
  });

  res.end();
};

module.exports.create = (req, res) => {
  if (!req.body.key) {
    res.status(400).json({ error: config.messages.no_key });

    return;
  }

  github.createIssue(
    req.body.key,
    {
      title: req.body.title,
      body:
        `#to: ${req.body.to}\n`
        + `#from: ${req.body.from}\n`
        + `#selected text: ${req.body.selected}\n`
        + `#comment: ${req.body.comment}`
    });

  res.end();
};
