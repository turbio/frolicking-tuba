const github = require('../integrations/github');
const url = require('../integrations/url');
const config = require('../../env/config.json');
const User = require('../models/user');
const Key = require('../models/key');
const multiparty = require('multiparty');
const aws = require('aws-sdk');

const accessHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept'
};

module.exports.allowCORS = (req, res) => {
  res.set(accessHeaders);

  res.end();
};

aws.config.update({
  accessKeyId: config.aws.access_key_id,
  secretAccessKey: config.aws.secret_access_key
});

const s3 = new aws.S3();

const uploadFile = (stream) => new Promise((resolve, reject) => {
  //if (!stream) {
    //reject();
  //}
  //stream.resume();
  //resolve();

  //make the filename a little bit safer
  const fileKey = Date.now() + stream.filename.replace(/[^\w]/g, '');

  s3.putObject({
    Bucket: config.aws.s3_bucket,
    Key: fileKey,
    ACL: 'public-read',
    Body: stream,
    ContentType: stream.headers['content-type'],
    ContentLength: stream.byteCount
  }, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve(`${config.aws.s3_url}${config.aws.s3_bucket}/${fileKey}`);
    }
  });
});

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

  form.on('field', (name, value) => (reqBody[name] = value));

  form.on('part', (part) => {
    promise
    .then(() => uploadFile(part))
    .then((accessor) => (reqBody.attachment = accessor));
  });

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
