const config = require('../../env/config.json');
const Integration = require('../models/integration');

module.exports.getAll = (req, res) => {
  if (!req.session.user) {
    res.status(400).json({ error: config.messages.not_logged_in });

    return;
  }

  Integration.findAll({
    where: { userId: req.session.user.id },
    attributes: ['type']
  }).then((integrations) => res.json(integrations));
};
