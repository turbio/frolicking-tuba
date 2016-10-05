const github = require('../integrations/github');
const config = require('../../env/config.json');

const accessHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept'
};

module.exports.allowCORS = (req, res) => {
  res.set(accessHeaders);

  res.end();
};

module.exports.create = (req, res) => {
  console.log('start of "create" in annotate');

  if (!req.body.key) {
    res.status(400).json({ error: config.messages.no_key });

    return;
  }

  console.log('request is: ', req.body);

  //UN-COMMENT THE TEXT BELOW WHEN READY TO TEST WITH GITHUB
  // github.createIssue(
  //   req.body.key,
  //   {
  //     title: req.body.title,
  //     body:
  //       //here --> consider using markdown to embed the image in the body...
  //         //look up embedding images in markdown
  //       //look at the syntax here...
  //         //what markdown expects for header styling for example
  //       `#`to: ${req.body.to}\n`
  //       + `#from: ${req.body.from}\n`
  //       + `#selected text: ${req.body.selected}\n`
  //       + `#comment: ${req.body.comment}`
  //   });

  res.set(accessHeaders);
  res.end();
};
