const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  hash: { type: Sequelize.STRING },
  ghtoken: { type: Sequelize.STRING }
});

module.exports = User;
