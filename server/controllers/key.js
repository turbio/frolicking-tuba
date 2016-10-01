const config = require('../../env/config.json');
const Key = require('../models/key');

module.exports.getAll = (req, res) => {
  if (req.session.user) {
    Key.findAll({ where: { userId: req.session.user.id } })
    .then((keys) => {
      res.status(200).json(keys);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
  } else {
    res.status(400).json({ error: config.messages.not_logged_in });
  }
  console.log(req.session.user);
};

module.exports.createKey = (req, res) => {
  if (!req.session.user) {
    res.status(400).json({ error: config.messages.not_logged_in });

    return;
  }

  Key.create({ userId: req.session.user.id })
  .then((key) => {
    console.log(
      'key created',
      JSON.stringify(key),
      'going back to index');
    res.redirect('/create/github');
  });
};

