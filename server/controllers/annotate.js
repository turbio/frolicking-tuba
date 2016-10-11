const github = require('../integrations/github');
const url = require('../integrations/url');
const config = require('../../env/config.json');
const User = require('../models/user');
const Key = require('../models/key');
const multiparty = require('multiparty');
//const AWS = require('aws-sdk');

const accessHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept'
};

module.exports.allowCORS = (req, res) => {
  res.set(accessHeaders);

  res.end();
};

//const AWS_BUCKET_URL =
//'https://s3-us-west-1.amazonaws.com/tuba-images-bucket/';

//prefer using environment variables versus hard-coding values here
//AWS.config.update({
  //accessKeyId: config.aws.accessKeyId,
  //secretAccessKey: config.aws.secretAccessKey
//});
//const s3Client = new AWS.S3();

//const uploadFile = (part) => new Promise((resolve, reject) => {
  //const fileKey = Date.now() + part.filename;

  //s3Client.putObject({
    //Bucket: 'tuba-images-bucket',
    //Key: fileKey,
    //ACL: 'public-read',
    //Body: part,
    //ContentType: part.headers['content-type'],
    //ContentLength: part.byteCount
  //}, (err) => {
    //if (err) {
      //reject(err);
    //} else {
      //resolve(AWS_BUCKET_URL + fileKey);
    //}
  //});
//});

const sendAnnotation = (body) => new Promise((resolve, reject) => {
  if (!body || !body.key) {
    reject(config.messages.no_key);

    return;
  }

  const params = {};

  Key.findOne({ where: { key: body.key } })
  .then((key) => {
    if (!key) {
      return Promise.reject(config.messages.bad_key);
    }

    params.type = key.type;
    params.output_meta = key.endpoint;

    return User.findOne({ where: { id: key.userId } });
  })
  .then((user) => {
    if (!user) {
      return Promise.reject(config.messages.server_error);
    }

    params.integration_meta = user.ghtoken;

    return Promise.resolve();
  })

  .then(() => github.createIssue(params, body))
  .then(() => url.postToUrl(params, body))

  .then(() => resolve())
  .catch((err) => reject(err));
});

module.exports.create = (req, res) => {
  const reqBody = {};
  const form = new multiparty.Form();
  const promise = Promise.resolve();

  //form.on('part', (part) => promise.then(uploadFile(part)));
  form.on('part', (part) => part.resume());
  form.on('field', (name, value) => (reqBody[name] = value));

  form.on('close', () => {
    promise
      .then(() => sendAnnotation(reqBody))
      .then(() => {
        res.set(accessHeaders);
        res.end();
      }).catch((error) => {
        res.status(400).json({ error });
      });
  });

  form.parse(req);
};
