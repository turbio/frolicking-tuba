const Sequelize = require('sequelize');
const db = require('../db');
const User = require('./user');

const Integration = db.define('integration', {
  type: { type: Sequelize.STRING },
  meta: { type: Sequelize.STRING }
});

Integration.belongsTo(User);

module.exports = Integration;
