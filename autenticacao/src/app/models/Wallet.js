const Sequelize = require('sequelize');
const db = require('../../database');
const bcrypt = require('bcryptjs');
const uuid = require('uuid/v4');
const User = require('./User');
const sequelize = db.connect();

class Wallet extends Sequelize.Model { };

Wallet.init({
    id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuid()
    },
    publicKey: {
        type: Sequelize.STRING,
        allowNull: false
    },
    privateKey: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    wif: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    }
},
    {
        sequelize,
        modelName: 'wallet',
        hooks: {
            beforeCreate: async user => {
                user.password = await bcrypt.hash(user.getDataValue('password'), 10);
            },
            beforeUpdate: async user => {
                user.password = await bcrypt.hash(user.getDataValue('password'), 10);
            },
        },
    }
);
Wallet.hasOne(User);
module.exports = Wallet;