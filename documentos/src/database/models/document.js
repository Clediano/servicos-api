'use strict';

const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const document = sequelize.define('document', {
    oidArchive: DataTypes.STRING,
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
        beforeCreate: async document => {
          document.id = uuid();
        }
      }
    }
  );
  document.associate = function (models) {
    // associations can be defined here
  };
  return document;
};