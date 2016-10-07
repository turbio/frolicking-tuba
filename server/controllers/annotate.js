const github = require('../integrations/github');
const url = require('../integrations/url');
const config = require('../../env/config.json');
const Integration = require('../models/integration');
const Output = require('../models/output');
const Key = require('../models/key');
const multiparty = require('multiparty');
const AWS = require('aws-sdk');

//prefer using environment variables versus hard-coding values here
AWS.config.update({
  accessKeyId: '',
  secretAccessKey: ''
});
const s3Client = new AWS.S3();

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
  // let destPath = 'clientUploads/';
  const body = {};
  const form = new multiparty.Form();
  let promise1 = null;

  form.on('part', (part) => {
    promise1 = new Promise(
    (resolve, reject) => {
      //do async thing here
      console.log('part.filename is: ', part.filename);
      s3Client.putObject({
        Bucket: 'tuba-images-bucket',
        Key: 'filename123.txt',
        ACL: 'public-read',
        Body: part,
        ContentLength: part.byteCount
      }, (err, data) => {
        if (err) reject(err);
        if (data) {
          resolve(data);
        }
        console.log('done and data', data);
      });
    });
  });

  const params = {
    type: '',
    integration_meta: '',
    output_meta: ''
  };

  form.on('error', (err) => {
    console.log(`Error parsing form: ${err.stack}`);
  });
  form.on('field', (name, value) => {
    body[name] = value;
  });
  form.on('close', () => {
    console.log('body body is: ', body);
    if (!body.key) {
      res.status(400).json({ error: config.messages.no_key });

      return;
    }

    Key.findOne({
      where: { key: body.key },
      include: [Output]
    })
    .then((key) => {
      console.log('inside .then in Key.findOne');
      params.output_meta = key.output.meta;

      return Integration.findOne({ where: { id: key.output.integrationId } });
    })
    .then((integration) => {
      params.type = integration.type;
      params.integration_meta = integration.meta;

      if (promise1) {
        promise1.then((data) => {
          if (integration.type === 'github') {
            body.file = data.ETag;
            github.createIssue(params, body);
          }
          if (integration.type === 'url') {
            url.postToUrl(params, body);
          }
          res.set(accessHeaders);
          res.end();
        });
      } else {
        if (integration.type === 'github') {
          github.createIssue(params, body);
        }
        if (integration.type === 'url') {
          url.postToUrl(params, body);
        }
        res.set(accessHeaders);
        res.end();
      }
    });
  });

  form.parse(req);

};
