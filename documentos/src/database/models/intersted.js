'use strict';

const uuid = require('uuid/v4');

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
  },
    {
      hooks: {
        beforeCreate: async intersted => {
          intersted.id = uuid();
        }
      }
    }
  );
  intersted.associate = function (models) {
    // associations can be defined here
  };
  return intersted;
};