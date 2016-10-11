const config = require('../../env/config.json');
const Key = require('../models/key');

module.exports.getAll = (req, res) => {
  if (req.session.user) {
    Key.findAll({ where: { userId: req.session.user.id } })
    .then((keys) => {
      res.status(200).json(keys);
    })
    .catch((err) => {
      res.status(500).json({ error: config.messages.server_error });
    });
  } else {
    res.status(400).json({ error: config.messages.not_logged_in });
  }
};

module.exports.createKey = (req, res) => {
  if (!req.session.user) {
    res.status(400).json({ error: config.messages.not_logged_in });

    return;
  }

  if (req.body.key) {
    Key.update({
      name: req.body.name,
      type: req.body.type,
      endpoint: req.body.endpoint
    }, { where: { key: req.body.key } })
    .then((result) => {
      res.status(200).json({ rowsUpdated: result[0] });
    });
  } else {
    Key.create({
      userId: req.session.user.id,
      name: req.body.name,
      type: req.body.type,
      endpoint: req.body.endpoint
    })
    .then((key) => {
      res.status(200).json(key);
    });
  }
};
