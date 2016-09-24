const User = require('../models/user');

module.exports.signin = (req, res) => {
  User.findOne({ email: req.body.email });
  res.send('not implemented');
};

module.exports.signup = (req, res) => {
  res.send('not implemented');
};
