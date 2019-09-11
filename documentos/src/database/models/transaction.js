'use strict';

const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('transaction', {
    transaction: {
      type: DataTypes.STRING
    },
    height: {
      type: DataTypes.INTEGER
    },
    hash: {
      type: DataTypes.STRING
    },
    opreturn: {
      type: DataTypes.STRING
    },
    confirmations: {
      type: DataTypes.INTEGER
    },
    size: {
      type: DataTypes.INTEGER
    },
    confirmed: {
      type: DataTypes.BOOLEAN
    },
    documentid: {
      type: DataTypes.UUID,
      references: {
        model: 'documents',
        key: 'id'
      }
    },
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
    Transaction.belongsTo(models.document, {
      foreignKey: 'documentid'
    });
  };
  return Transaction;
};