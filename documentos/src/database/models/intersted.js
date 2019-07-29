'use strict';
module.exports = (sequelize, DataTypes) => {
  const intersted = sequelize.define('intersted', {
    publicKey: DataTypes.STRING,
    organizationId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'organizations',
        key: 'id'
      }
    },
  }, {});
  intersted.associate = function(models) {
    // associations can be defined here
  };
  return intersted;
};