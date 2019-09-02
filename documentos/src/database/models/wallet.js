'use strict';

const uuid = require('uuid/v4');
const { criptografar, descriptografar } = require('../../cryptography');

module.exports = (sequelize, DataTypes) => {
    const Wallet = sequelize.define('wallet', {
        publickey: DataTypes.STRING,
        privatekey: DataTypes.STRING,
        wif: DataTypes.STRING,
        address: DataTypes.STRING,
        organizationid: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'organizations',
                key: 'id'
            }
        },
    },
        {
            hooks: {
                beforeCreate: async wallet => {
                    wallet.id = uuid();
                    wallet.privatekey = criptografar(wallet.getDataValue('privatekey'));
                },

            }
        }
    );
    Wallet.associate = function (models) {
        // associations can be defined here
    };
    return Wallet;
};