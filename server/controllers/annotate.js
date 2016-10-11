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
  console.log('=== sending annotation ===');
  if (!body || !body.key) {
    reject(config.messages.no_key);

    return;
  }

  console.log('=== with key', body.key, '===');

  const params = {};

  Key.findOne({ where: { key: body.key } })
  .then((key) => {
    if (!key) {
      return Promise.reject(config.messages.bad_key);
    }

    console.log('=== found key with id', key.id, '===');
    console.log('=== key type', key.type, '===');
    console.log('=== key output', key.endpoint, '===');

    params.type = key.type;
    params.output_meta = key.endpoint;

    return User.findOne({ where: { id: key.userId } });
  })
  .then((user) => {
    if (!user) {
      return Promise.reject(config.messages.server_error);
    }

    console.log('=== found user with id', user.id, '===');
    console.log('=== integration meta', user.ghtoken, '===');

    params.integration_meta = user.ghtoken;

  })
  .then(() => {

    if (params.type === 'github') {
      console.log('=== sending to github ===');

      return github.createIssue(params, body);
    }

    return Promise.resolve();

  })
  .then(() => {
    if (params.type === 'url') {
      console.log('=== sending to url ===');

      return url.postToUrl(params, body);
    }

    return Promise.resolve();
  })
  .then(() => resolve())
  .catch((err) => reject(err));
});

module.exports.create = (req, res) => {
  const reqBody = {};
  const form = new multiparty.Form();
  const promise = Promise.resolve();

  //form.on('part', (part) => promise.then(uploadFile(part)));
  form.on('part', (part) =>
      console.log('=== part recieved ===') || part.resume());

  form.on('error', (error) => console.log('=== part error ===', error));

  form.on('field', (name, value) => (reqBody[name] = value));

  form.on('close', () => {
    console.log('=== form recieved ===');
    promise
      .then(() => sendAnnotation(reqBody))
      .then(() => {
        console.log('=== all done, wrapping up ===');
        res.set(accessHeaders);
        res.end();
      }).catch((error) => {
        res.status(400).json({ error });
      });
  });

  form.parse(req);
};
