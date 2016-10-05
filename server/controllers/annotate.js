const github = require('../integrations/github');
const config = require('../../env/config.json');

const Integration = require('../models/integration');
const Output = require('../models/output');
const Key = require('../models/key');

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
  if (!req.body.key) {
    res.status(400).json({ error: config.messages.no_key });

    return;
  }

  const params = {
    type: '',
    integration_meta: '',
    output_meta: ''
  };

  Key.findOne({
    where: { key: req.body.key },
    include: [Output]
  })
  .then((key) => {
    params.output_meta = key.output.meta;

    return Integration.findOne({ where: { id: key.output.integrationId } });
  })
  .then((integration) => {
    params.type = integration.type;
    params.integration_meta = integration.meta;

    if (integration.type === 'github') {
      github.createIssue(params, req.body);
    }
    // if (integration.type === 'url') {
    //   url.postToUrl(params, req.body);
    // }

    res.set(accessHeaders);
    res.end();
  });
};
