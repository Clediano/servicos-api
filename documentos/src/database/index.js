const Sequelize = require('sequelize');
const config = require('config');

function connect() {
    const sequelize = new Sequelize('database', config.get('Database.user'), config.get('Database.pass'), {
        host: config.get('Database.host'),
        dialect: 'postgres'
    });

    return sequelize;
}

module.exports = { connect };