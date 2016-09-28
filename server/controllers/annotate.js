const github = require('../integrations/github');

module.exports.create = (req, res) => {
  console.log('got annotation', req.body);

  github.createIssue('frolicking-tuba/issue-tester', {
    title: req.body.comment,
    body: `>${req.body.selected}`
  });

  res.end();
};
