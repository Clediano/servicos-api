'use strict';

const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const transaction = sequelize.define('transaction', {
    transactionId: DataTypes.STRING,
    height: DataTypes.INTEGER,
    hash: DataTypes.STRING,
    opReturn: DataTypes.STRING,
    confirmation: DataTypes.INTEGER,
    size: DataTypes.INTEGER,
    confirmed: DataTypes.BOOLEAN,
    documentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'documents',
        key: 'id'
      }
    }
  },
    {
      hooks: {
        beforeCreate: async transaction => {
          transaction.id = uuid();
        }
      }
    }
  );
  transaction.associate = function (models) {
    // associations can be defined here
  };
  return transaction;
};