const Sequelize = require('sequelize');
const db = require('../../database');
const uuid = require('uuid/v4');

const sequelize = db.connect();

class Transaction extends Sequelize.Model { };

Transaction.init({
    id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuid()
    },
    id_transaction: {
        type: Sequelize.STRING,
        allowNull: false
    },
    height: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    hash: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    confirmed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    confirmations: Sequelize.INTEGER,
    size: Sequelize.INTEGER
},
    {
        sequelize,
        modelName: 'transaction',
    }
);

module.exports = Transaction;
