'use strict';

const bcrypt = require('bcryptjs');
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define('organization', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      set(email) {
        this.setDataValue('email', email.toString().toLowerCase());
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    oidphoto: DataTypes.STRING,
    passwordresettoken: DataTypes.STRING,
    passwordresetexpired: DataTypes.DATE
  }, {
      hooks: {
        beforeCreate: async organization => {
          organization.id = uuid();
          organization.password = await bcrypt.hash(organization.getDataValue('password'), 10);
        },
        beforeUpdate: async organization => {
          organization.password = await bcrypt.hash(organization.getDataValue('password'), 10);
        },
      }
    });
  Organization.associate = function (models) {
    // associations can be defined here
    Organization.hasMany(models.document);

    Organization.hasMany(models.transaction);

    Organization.hasOne(models.wallet);
  };
  return Organization;
};