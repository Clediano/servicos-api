'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('organizations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
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
        type: Sequelize.STRING(512),
        allowNull: false,
      },
      oidphoto: {
        type: Sequelize.STRING
      },
      passwordresettoken: {
        type: Sequelize.STRING
      },
      passwordresetexpired: {
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