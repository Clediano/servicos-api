'use strict';

const uuid = require('uuid/v4');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('organizations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuid()
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        set(email) {
          this.setDataValue('email', email.toString().toLowerCase());
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      oidPhoto: {
        type: Sequelize.STRING
      },
      passwordResetToken: {
        type: Sequelize.STRING
      },
      passwordResetExpired: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('organizations');
  }
};