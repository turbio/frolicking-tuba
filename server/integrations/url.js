const request = require('request');
const config = require('../../env/config.json');
const Integration = require('../models/integration');
const Output = require('../models/output');
const Key = require('../models/key');

module.exports.postToUrl = (params, body) => {
  console.log('PARAMS', params, 'BODY', body);

  const options = {
    url: params.output_meta,
    method: 'POST',
    // headers: {
    //   Authorization: `token ${params.integration_meta}`,
    //   'User-Agent': config.github.user_agent
    // },
    body: {
      title: body.title,
      body:
        `#to: ${body.to}\n`
        + `#from: ${body.from}\n`
        + `#selected text: ${body.selected}\n`
        + `#comment: ${body.comment}`
    },
    json: true
  };

  request(options, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports.urlList = (req, res) => {
  if (!req.session.user) {
    res.status(400).json({ error: config.messages.not_logged_in });

    return;
  }

  Integration.findOne({
    where: {
      userId: req.session.user.id,
      type: 'url'
    }
  })
  .then((integration) => {
    if (!integration) {
      res.status(400).json([]);

      return;
    }

    Output.findAll({ where: { integrationId: integration.id } })
    .then((urls) => {
      res.status(200).json(urls.map((url) => url.meta));
    });

  });
};

module.exports.urlSelect = (req, res) => {
  if (!req.session.user) {
    res.status(400).json({ error: config.messages.not_logged_in });

    return;
  }

  let newIntegrationId = false;

  Integration.findOrCreate({
    where: {
      userId: req.session.user.id,
      type: 'url'
    }
  })
  .spread((integration, created) => {
    if (created) {
      console.log('created new integration');
    }

    return integration;
  })
  .then((integration) => {
    newIntegrationId = integration.id;

    return Key.create({ userId: req.session.user.id });
  })
  .then((key) => Output.create({
    meta: req.body.name,
    integrationId: newIntegrationId,
    keyId: key.id
  }))
  .then((output) => {
    res.send(output);
  })
  .catch((err) => {
    res.send(err);
  });
};
