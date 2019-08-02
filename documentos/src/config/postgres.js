const Sequelize = require('sequelize');
const config = require('./secret');

let connection = null;

function connect(callback) {
    if (connection) return callback(null, db);

    const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASS, {
        host: config.DB_HOST,
        dialect: config.DB_DIALECT
    });

    sequelize
        .authenticate()
        .then(() => {
            connection = sequelize;
            return callback(null, connection);
        })
        .catch(err => {
            console.error('Não foi possível conectar-se a base de dados:', err);
            return callback(err, null);
        });
};

function disconnect() {
    if (!connection) return true;

    connection.close();
    connection = null;
    return true;
};

module.exports = { connect, disconnect };