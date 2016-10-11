const bluebird = require('bluebird');
const bcrypt = bluebird.promisifyAll(require('bcrypt'));
const User = require('../models/user');
const config = require('../../env/config.json');

module.exports.signin = (req, res) => {
  const session = req.session;
  let sessionUser = {};

  Promise.resolve().then(() =>
      User.findOne({ where: { email: req.body.email } }))

    .then((user) =>
      user || Promise.reject(config.messages.incorrect_cred))

    .then((user) => {
      sessionUser = user;

      return bcrypt.compareAsync(req.body.password, user.hash);

    }).then((same) => {
      if (same) {
        session.user = sessionUser;
        res.json({ error: null });

        return Promise.resolve();
      }

      return Promise.reject(config.messages.incorrect_cred);

    }).catch((err) => {
      if (typeof err === 'string') {
        res.status(400).json({ error: err });
      } else {
        res.status(500).json({ error: config.messages.server_error });
      }
    });
};

module.exports.signup = (req, res) => {
  const session = req.session;

  Promise.resolve().then(() => {
    if (!req.body.email || !req.body.password) {
      return Promise.reject(config.messages.missing_cred);
    }

    return Promise.resolve();

  }).then(() =>
      bcrypt.hashAsync(req.body.password, config.salt_rounds))

    .then((hash) =>
      User.create({ email: req.body.email, hash }))

    .then((user) => {
      session.user = user;
      res.json({ error: null });

    }).catch((err) => {
      if (typeof err === 'string') {
        res.status(400).json({ error: err });
      } else if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ error: config.messages.unique_email });
      } else {
        res.status(500).json({ error: config.messages.server_error });
      }
    });
};

module.exports.signout = (req, res) => {
  req.session.destroy(() => res.end());
};

module.exports.info = (req, res) => {
  if (req.session.user) {
    res.json({
      github_authenticated: false,
      github_client_id: config.github.client_id
    });
  } else {
    res.status(400).json({ error: config.messages.not_logged_in });
  }
};

module.exports.signedin = (req, res) => {
  res.json({ signedin: !!req.session.user });
};

module.exports.hasGithub = (req, res) => {
  if (!req.session.user) {
    res.status(400).json({ error: config.messages.not_logged_in });

    return;
  }
  User.findOne({ where: { id: req.session.user.id } })
  .then((user) => {
    if (user.ghtoken === null) {
      res.json({ github: false });
    } else {
      res.json({ github: true });
    }
  })
  .catch((err) => {
    res.status(500).json({ error: config.messages.server_error });
  });
};
