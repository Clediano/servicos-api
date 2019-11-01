'use strict';

const uuid = require('uuid/v4');
const { criptografar } = require('../../cryptography');

module.exports = (sequelize, DataTypes) => {
    const Wallet = sequelize.define('wallet', {
        publickey: {
            type: DataTypes.STRING,
            allowNull: false
        },
        privatekey: {
            type: DataTypes.STRING(512),
            allowNull: false
        },
        wif: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        organizationid: {
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
                beforeUpdate: async wallet => {
                    wallet.privatekey = criptografar(wallet.getDataValue('privatekey'));
                }
            }
        }
    );
    Wallet.associate = function (models) {
        Wallet.belongsTo(models.organization, {
            foreignKey: 'organizationid'
        });
    };
    return Wallet;
};