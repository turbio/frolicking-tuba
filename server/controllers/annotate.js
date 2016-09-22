const github = require('../api/github');

module.exports.create = (req, res) => {
  github.createIssue('frolicking-tuba/issue-tester', {
    title: 'title',
    body: 'issue body'
  });

  res.end();
};
