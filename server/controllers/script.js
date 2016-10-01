const fs = require('fs');

let script = null;

module.exports.get = (req, res) => {
  if (!req.query.key) {
    res.status(400).end('you must include a key');
  }

  res.contentType('application/javascript');

  if (script) {
    res.send(script.replace('%KEY%', req.query.key));
  } else {
    fs.readFile('./apiscript/markup.min.js', 'utf8', (err, src) => {
      if (err) {
        console.log(err);
      }
      script = src;
      res.send(script);
    });
  }
};
