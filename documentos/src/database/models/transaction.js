'use strict';

const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('transaction', {
    transactionid: DataTypes.STRING,
    height: DataTypes.INTEGER,
    hash: DataTypes.STRING,
    opreturn: DataTypes.STRING,
    confirmation: DataTypes.INTEGER,
    size: DataTypes.INTEGER,
    confirmed: DataTypes.BOOLEAN,
    documentId: {
      type: DataTypes.UUID,
      references: {
        model: 'documents',
        key: 'id'
      }
    },
    organizationId: {
      type: DataTypes.UUID,
      references: {
        model: 'organizations',
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
  Transaction.associate = function (models) {
    // associations can be defined here
  };
  return Transaction;
};