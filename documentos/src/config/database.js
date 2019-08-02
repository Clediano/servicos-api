const config = require('./secret');

module.exports = {
  development: {
    username: config.DB_USER,
    password: config.DB_PASS,
    database: config.DB_NAME,
    host: config.DB_HOST,
    dialect: config.DB_DIALECT
  }
};