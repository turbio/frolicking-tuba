const github = require('../integrations/github');
const url = require('../integrations/url');
const config = require('../../env/config.json');
const User = require('../models/user');
const Key = require('../models/key');
const multiparty = require('multiparty');
const AWS = require('aws-sdk');

const AWS_BUCKET_URL = 'https://s3-us-west-1.amazonaws.com/tuba-images-bucket/';

//prefer using environment variables versus hard-coding values here
AWS.config.update({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey
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

const uploadFile = (part) => new Promise((resolve, reject) => {
  const fileKey = Date.now() + part.filename;

  s3Client.putObject({
    Bucket: 'tuba-images-bucket',
    Key: fileKey,
    ACL: 'public-read',
    Body: part,
    ContentType: part.headers['content-type'],
    ContentLength: part.byteCount
  }, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve(AWS_BUCKET_URL + fileKey);
    }
  });
});

const sendAnnotation = (body) => new Promise((resolve, reject) => {
  console.log('SENDING ANNOTATION WITH DATA', body);
  if (!body || !body.key) {
    reject(config.messages.no_key);

    return;
  }

  const params = {
    type: '',
    integration_meta: '',
    output_meta: ''
  };

  Key.findOne({ where: { key: body.key } })
  .then((key) => {
    console.log('found key!', key.type);
    params.type = key.type;
    params.output_meta = key.endpoint;

    return User.findOne({ where: { id: key.userId } });
  })
  .then((user) => {
    console.log('GOT BODY', body);
    params.integration_meta = user.ghtoken;

    if (params.type === 'github') {
      github.createIssue(params, body);
    }
    if (params.type === 'url') {
      url.postToUrl(params, body);
    }
    resolve();
  });
});

module.exports.create = (req, res) => {
  console.log('STARTED KEY CREATION');
  const reqBody = {};
  const form = new multiparty.Form();
  const promise = Promise.resolve();

  form.on('part', (part) =>
    promise.then(uploadFile(part)));

  form.on('error', (err) =>
    console.log(`Error parsing form: ${err.stack}`));

  form.on('field', (name, value) => {
    reqBody[name] = value;
  });

  form.on('close', () => {
    promise
      .then(sendAnnotation(reqBody))
      .then(() => {
        console.log('CREATED KEY...!?');
        res.set(accessHeaders);
        res.end();
      }).catch((error) => {
        console.log('ERROR WHILE CREATING KEY', error);
        res.status(400).json({ error });
      });
  });

  form.parse(req);
};
