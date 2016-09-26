const bluebird = require('bluebird');
const bcrypt = bluebird.promisifyAll(require('bcrypt'));
const User = require('../models/user');
const config = require('../../env/config.json');

module.exports.signin = (req, res) => {
  User.findOne({ email: req.body.email });
  res.send('not implemented');
};

module.exports.signup = (req, res) => {
  Promise.resolve().then(() => {
    if (!req.body.email || !req.body.password) {
      return Promise.reject(config.messages.missing_cred);
    }

    return Promise.resolve();

  }).then(() =>
      bcrypt.hashAsync(req.body.password, config.salt_rounds))

    .then((hash) =>
      User.create({ email: req.body.email, password: hash }))

    .then(() =>
      res.json({ error: null }))

    .catch((err) => {
      if (typeof err === 'string') {
        res.status(400).json({ error: err });
      } else if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ error: config.messages.unique_email });
      } else {
        res.status(500).json({ error: config.messages.server_error });
      }
    });
};
