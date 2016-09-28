const config = require('../../env/config.json');

module.exports.getAll = (req, res) => {
  if (!req.session.user) {
    res.status(400).json({ error: config.messages.not_logged_in });

    return;
  }

  console.log(req.session.user);
};
