const Sequelize = require('sequelize');

function connect() {

    const DB_HOST = 'localhost';
    const DB_USER = 'postgres';
    const DB_PASS = 'postgres';

    const sequelize = new Sequelize('database', DB_USER, DB_PASS, {
        host: DB_HOST,
        dialect: 'postgres'
    });

    return sequelize;
}

module.exports = { connect };