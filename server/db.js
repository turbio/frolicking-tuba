const Sequelize = require('sequelize');
const config = require('../env/config.json');

const sequelize = new Sequelize(
  config.database.database,
  config.database.user,
  config.database.password,
  {
    logging: false,
    host: config.database.host,
    dialect: config.database.type
  }
);

module.exports = sequelize;
