'use strict';

const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('document', {
    oidArchive: DataTypes.STRING,
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
        beforeCreate: async document => {
          document.id = uuid();
        }
      }
    }
  );
  Document.associate = function (models) {
    Document.hasOne(models.transaction);
    Document.belongsTo(models.organization);
  };
  return Document;
};