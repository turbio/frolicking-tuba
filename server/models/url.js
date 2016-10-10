const Sequelize = require('sequelize');
const db = require('../db');
const User = require('./user');

const Url = db.define('url', { url: Sequelize.STRING });

Url.belongsTo(User);

module.exports = Url;
