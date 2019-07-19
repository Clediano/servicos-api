const Sequelize = require('sequelize');

function connect() {
    const sequelize = new Sequelize('database', process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        dialect: 'postgres'
    });

    return sequelize;
}

module.exports = { connect };