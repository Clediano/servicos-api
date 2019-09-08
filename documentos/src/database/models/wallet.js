'use strict';

const uuid = require('uuid/v4');
const { criptografar } = require('../../cryptography');

module.exports = (sequelize, DataTypes) => {
    const Wallet = sequelize.define('wallet', {
        publickey: DataTypes.STRING,
        privatekey: DataTypes.STRING,
        wif: DataTypes.STRING,
        address: DataTypes.STRING,
        organizationId: {
            type: DataTypes.UUID,
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