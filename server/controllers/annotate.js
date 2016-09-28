const github = require('../integrations/github');

module.exports.create = (req, res) => {
  console.log('got annotation', req.body);

  github.createIssue('frolicking-tuba/issue-tester', {
    title: req.body.title,
    body: `#to: ${req.body.to} \n
      #from: ${req.body.from} \n
      #selected text: ${req.body.selected} \n
      #comment: ${req.body.comment}`
  });

  res.end();
};
