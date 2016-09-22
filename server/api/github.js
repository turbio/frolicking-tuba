const config = require('../../env/config.json');
const https = require('https');
const apiUrl = 'api.github.com';

module.exports.createIssue = (repo, issue) => {
  const auth = new Buffer(
    `${config.username}:${config.password}`).toString('base64');

  const options = {
    host: apiUrl,
    post: 80,
    path: `/repos/${repo}/issues`,
    method: 'POST',
    headers: {
      'User-Agent': 'frolicking tuba'
    },
    auth: `${config.github.username}:${config.github.password}`
  };

  const req = https.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (part) => {
      console.log(part);
    });
  });

  req.write(JSON.stringify(issue));
  req.end();
};
