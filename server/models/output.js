const Sequelize = require('sequelize');
const db = require('../db');
const Integration = require('./integration');
// const Key = require('./key');

const Output = db.define('output', { meta: Sequelize.STRING });

Output.belongsTo(Integration);
// Output.belongsTo(Key);

module.exports = Output;
