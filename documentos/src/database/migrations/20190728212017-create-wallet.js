'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('wallets', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      publickey: {
        type: Sequelize.STRING,
        allowNull: false
      },
      privatekey: {
        type: Sequelize.STRING,
        allowNull: false
      },
      wif: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      organizationid: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'organizations',
          key: 'id'
        }
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
    return queryInterface.dropTable('wallets');
  }
};