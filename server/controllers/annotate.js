const github = require('../integrations/github');
const url = require('../integrations/url');
const config = require('../../env/config.json');

const Integration = require('../models/integration');
const Output = require('../models/output');
const Key = require('../models/key');
const multiparty = require('multiparty');
const AWS = require('aws-sdk');
const bucket = process.env.S3_BUCKET;
const s3Client = new AWS.S3({
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET
});

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
  const receivedForm = new multiparty.Form();
  let destPath = 'clientUploads/';

  receivedForm.on('field', (name, value) => {
    if (name === 'key') {
      destPath += value;
    }
  });

  receivedForm.on('part', (part) => {
    s3Client.putObject({
      Bucket: bucket,
      Key: destPath,
      ACL: 'public-read',
      Body: part,
      ContentLength: part.byteCount
    }, (err, data) => {
      if (err) throw err;
      console.log('done', data);
    });
  });

  receivedForm.parse(req);

  if (!req.body.key) {
    res.status(400).json({ error: config.messages.no_key });

    return;
  }

  console.log('request is: ', req.body);

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
    if (integration.type === 'url') {
      url.postToUrl(params, req.body);
    }

    res.set(accessHeaders);
    res.end();
  });
};
