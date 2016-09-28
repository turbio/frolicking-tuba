const config = require('../../env/config.json');
const Key = require('../models/key');
const Integration = require('../models/integration');

const crypto = require('crypto');


module.exports.getAll = (req, res) => {
  if (req.session.user) {
    Key.find({ where: { userId: req.session.user.userId } })
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
  const string = req.session.user.id.toString();
  const key = crypto.createHash(string);

  Integration.findOne({ where: { userId: req.session.user.id } })
  .then((integration) => {
    Key.create({
      integrationId: integration.id,
      userId: req.session.user.id,
      key
    })
    .then(() => {
      res.redirect('/');
    });
  });
};

