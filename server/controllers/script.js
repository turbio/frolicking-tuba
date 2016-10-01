const fs = require('fs');

let script = null;

fs.readFile('./apiscript/markup.min.js', 'utf8', (err, src) => {
  if (err) {
    console.log(err);
  }

  script = src;
});

module.exports.get = (req, res) => {
  if (!req.query.key) {
    res.status(400).end('you must include a key');

    return;
  }

  res.contentType('application/javascript');
  res.send(script.replace('%KEY%', req.query.key));
};
