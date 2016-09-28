const Sequelize = require('sequelize');
const db = require('../db');
const User = require('./user');

const Key = db.define('key', { key: Sequelize.STRING });

Key.belongsTo(User);

module.exports = Key;
