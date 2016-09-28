const config = require('../../env/config.json');
const https = require('https');

const apiUrl = 'api.github.com';

module.exports.createIssue = (repo, issue) => {
  const options = {
    host: apiUrl,
    post: 80,
    path: `/repos/${repo}/issues`,
    method: 'POST',
    headers: { 'User-Agent': 'frolicking tuba' },
    auth: `${config.github.username}:${config.github.password}`
  };

  const req = https.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (part) => {
      console.log(part);
    });
  });

  req.write(JSON.stringify(issue));
  //req.end();
};

module.exports.register = (req, res) => {
  const apiHost = 'github.com';
  const apiPath = '/login/oauth/access_token';

  const options = {
    host: apiHost,
    post: 80,
    path: apiPath,
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };

  const githubReq = https.request(options, (githubRes) => {
    githubRes.setEncoding('utf8');
    githubRes.on('data', (part) => {
      console.log('data:', part);
    });
  });

  githubReq.write(
`client_id=${config.github.client_id}\
&client_secret=${config.github.secret}\
&code=${req.query.code}`
  );

  console.log('started...');
  githubReq.end();
  res.json('doing stuff...');
};
