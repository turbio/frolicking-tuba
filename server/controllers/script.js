const fs = require('fs');

let script = null;

module.exports.get = (req, res) => {
  res.contentType('application/javascript');

  if (script) {
    res.send(script);
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
