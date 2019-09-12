'use strict';

const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define('friend', {
    match: {
      type: DataTypes.BOOLEAN
    },
    invitedid: {
      type: DataTypes.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'organizations',
        key: 'id'
      }
    },
    interestedid: {
      type: DataTypes.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'organizations',
        key: 'id'
      }
    },
  },
    {
      hooks: {
        beforeCreate: async friend => {
          friend.id = uuid();
        }
      }
    }
  );
  Friend.associate = function (models) {

    Friend.belongsTo(models.organization, {
      foreignKey: 'interestedid',
      as: 'Interested'
    });

    Friend.belongsTo(models.organization, {
      foreignKey: 'invitedid',
      as: 'Invited'
    });

  };
  return Friend;
};