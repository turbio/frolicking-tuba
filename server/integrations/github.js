const config = require('../../env/config.json');
const request = require('request');
const key = require('../controllers/key');

const Integration = require('../models/integration');
const Output = require('../models/output');
const Key = require('../models/key');

module.exports.createIssue = (kee, issue) => {
  console.log('KEY', kee, 'ISSUE', issue);
  //yeah... it's ugly and i could really use an m:m sequelize for this
  Key.findOne({ where: { key: kee } })
  .then((fkee) => {
    Output.findOne({ where: { keyId: fkee.id } })
    .then((out) => {
      console.log('sending a issue request to github using:');
      console.log('REPO', out.meta);
      console.log('KEY', out.key.key);
    });
  });

  //this is just a place holder, it probably doesn't work
  //Integration.findOne()
    //.then((integration) => {
      //const options = {
        //url: `${config.github.api_url}/repos/${repo}/issues`,
        //method: 'POST',
        //body: issue,
        //headers: { Authorization: `token ${integration.meta}` }
      //};
    //});
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

  Integration.findOne({ where: { userId: req.session.user.id } })
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
