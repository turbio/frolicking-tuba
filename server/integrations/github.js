const config = require('../../env/config.json');
const request = require('request');
const key = require('../controllers/key');

const Integration = require('../models/integration');
const Output = require('../models/output');
const Key = require('../models/key');

module.exports.createIssue = (params, body) => {
  // console.log('PARAMS', params, 'ISSUE', body);

  const options = {
    url: `${config.github.api_url}/repos/${params.output_meta}/issues`,
    method: 'POST',
    headers: {
      Authorization: `token ${params.integration_meta}`,
      'User-Agent': config.github.user_agent
    },
    body: {
      title: body.title,
      body:
        `## Annotation\n`
        + `* to: ${body.to}\n`
        + `* from: ${body.from}\n`
        + `* selected text: ${body.selected}\n`
        + `* comment: ${body.comment}\n`
        + `* file url (if attachment included): ${body.url}\n`
        + `![alt text](${body.url})`
    },
    json: true
  };

  request(options, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports.register = (req, res) => {
  const options = {
    url: config.github.token_url,
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    json: true,
    body: `client_id=${config.github.client_id}`
          + `&client_secret=${config.github.secret}`
          + `&code=${req.query.code}`
  };

  request(options, (err, githubRes, body) => {
    if (!body.access_token || !req.session.user || err) {
      console.log('POST to get github access_token error:');
      if (err) {
        console.log('Response error:', err);
      }
      if (!body.access_token) {
        console.log('No access_token in the body of Response');
        console.log('Response body:', body);
      }
      res.status(400).json({ error: 'failed to authenticate with github' });

      return;
    }

    Integration.create({
      type: 'github',
      meta: body.access_token,
      userId: req.session.user.id
    }).then(() => {
      key.createKey(req, res);
    });
  });
};

module.exports.redirectTo = (req, res) => {
  res.redirect(
    `${config.github.auth_url}?client_id=${config.github.client_id}&scope=repo`
  );
};

module.exports.repoList = (req, res) => {
  if (!req.session.user) {
    res.status(400).json({ error: config.messages.not_logged_in });

    return;
  }

  Integration.findOne({
    where: {
      userId: req.session.user.id,
      type: 'github'
    }
  })
    .then((integration) => {
      if (!integration) {
        res.status(400).json({ error: config.messages.github_no_auth });

        return;
      }

      const options = {
        url: `${config.github.api_url}/user/repos`,
        method: 'GET',
        headers: {
          Authorization: `token ${integration.meta}`,
          'User-Agent': config.github.user_agent
        },
        json: true
      };

      request(options, (err, githubRes, body) => {
        if (err || !Array.isArray(body)) {
          res.status(400).json({ error: config.messages.github_no_auth });
        } else {
          res.json(body.map((repo) => repo.full_name));
        }
      });

    });
};

module.exports.repoSelect = (req, res) => {
  if (!req.session.user) {
    res.status(400).json({ error: config.messages.not_logged_in });

    return;
  }

  Integration.findOne({ where: { userId: req.session.user.id } })
  .then((integration) => {
    Key.findOne({ where: { userId: req.session.user.id } })
    .then((kee) => {
      Output.create({
        meta: req.body.name,
        integrationId: integration.id,
        keyId: kee.id
      });

      //temporary, i hope
      res.json({ error: null });
    });
  });
};
