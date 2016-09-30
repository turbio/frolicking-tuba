const Sequelize = require('sequelize');
const db = require('../db');
const Integration = require('./integration');
const Key = require('./key');

const Output = db.define('output', { meta: Sequelize.STRING });

Integration.belongsTo(Integration);
Integration.belongsTo(Key);

module.exports = Output;
