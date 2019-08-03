'use strict';

const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define('wallet', {
    publicKey: DataTypes.STRING,
    privateKey: DataTypes.STRING,
    wif: DataTypes.STRING,
    address: DataTypes.STRING,
    organizationId: {
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
        }
      }
    }
  );
  Wallet.associate = function (models) {
    // associations can be defined here
  };
  return Wallet;
};