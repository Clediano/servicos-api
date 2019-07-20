const Sequelize = require('sequelize');
const config = require('config');

function connect() {

    const host = config.get('Database.host');
    const user = config.get('Database.user');
    const pass = config.get('Database.pass');

    const sequelize = new Sequelize('database', user, pass, {
        host: host,
        dialect: 'postgres'
    });

    return sequelize;
}

module.exports = { connect };