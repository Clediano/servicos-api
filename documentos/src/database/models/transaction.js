'use strict';
module.exports = (sequelize, DataTypes) => {
  const transaction = sequelize.define('transaction', {
    transactionId: DataTypes.STRING,
    height: DataTypes.INTEGER,
    hash: DataTypes.STRING,
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
  }, {});
  transaction.associate = function(models) {
    // associations can be defined here
  };
  return transaction;
};