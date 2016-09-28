const Sequelize = require('sequelize');
const db = require('../db');
const User = require('./user');
const config = require('../../env/config.json');

const Integration = db.define('integration', {
  type: Reflect.apply(Sequelize.ENUM, null, config.integrations),
  meta: Sequelize.STRING
});

Integration.belongsTo(User);

module.exports = Integration;
