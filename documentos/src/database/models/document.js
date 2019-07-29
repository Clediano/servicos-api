'use strict';
module.exports = (sequelize, DataTypes) => {
  const document = sequelize.define('document', {
    oidArchive: DataTypes.STRING,
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
  }, {});
  document.associate = function (models) {
    // associations can be defined here
  };
  return document;
};