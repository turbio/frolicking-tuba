const multiparty = require('multiparty');

const github = require('../integrations/github');
const url = require('../integrations/url');
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

  const params = {
    type: '',
    integration_meta: '',
    output_meta: ''
  };

  const body = {};

  const form = new multiparty.Form();

  form.on('error', (err) => {
    console.log(`Error parsing form: ${err.stack}`);
  });

  form.on('field', (name, value) => {
    body[name] = value;
  });

  form.on('close', () => {
    if (!body.key) {
      res.status(400).json({ error: config.messages.no_key });

      return;
    }

    Key.findOne({
      where: { key: body.key },
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
        github.createIssue(params, body);
      }
      if (integration.type === 'url') {
        url.postToUrl(params, body);
      }
      res.set(accessHeaders);
      res.end();
    });

  });

  form.parse(req);


};
