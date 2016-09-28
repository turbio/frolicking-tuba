const Sequelize = require('sequelize');
const db = require('../db');
const User = require('./user');
const Integration = require('./integration');

const Key = db.define('key', { key: Sequelize.STRING });

Key.belongsTo(User);
Key.belongsTo(Integration);

module.exports = Key;
