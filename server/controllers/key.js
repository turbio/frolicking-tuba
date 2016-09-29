const config = require('../../env/config.json');
const Key = require('../models/key');
const Integration = require('../models/integration');

const hash = require('js-md5');

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
  console.log('starting keygen process');
  const entropy = `${req.session.user.name}ENTROPY!`;
  const keyString = hash(entropy);

  Integration.findOne({ where: { userId: req.session.user.id } })
  .then((integration) => {
    console.log('associating with integration', JSON.stringify(integration));

    return Key.create({
      //integrationId: integration.id,
      userId: req.session.user.id,
      key: keyString
    })
    .then((key) => {
      console.log(
        'key created',
        JSON.stringify(key),
        'going back to index');
      res.redirect('/');
    });
  });
};

