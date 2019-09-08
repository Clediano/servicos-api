'use strict';

const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const Intersted = sequelize.define('intersted', {
    organizationInvited: {
      type: DataTypes.UUID
    },
    organizationInterested: {
      type: DataTypes.UUID
    },
    match: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
    {
      hooks: {
        beforeCreate: async intersted => {
          intersted.id = uuid();
        }
      }
    }
  );
  Intersted.associate = function (models) {
    // associations can be defined here
  };
  return Intersted;
};