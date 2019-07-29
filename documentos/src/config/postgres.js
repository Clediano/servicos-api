const Sequelize = require('sequelize');

let connection = null;

function connect(callback) {
    if (connection) return callback(null, db);

    const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
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