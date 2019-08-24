'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      transactionid: {
        type: Sequelize.STRING
      },
      height: {
        type: Sequelize.INTEGER
      },
      hash: {
        type: Sequelize.STRING
      },
      opreturn: {
        type: Sequelize.STRING
      },
      confirmation: {
        type: Sequelize.INTEGER
      },
      size: {
        type: Sequelize.INTEGER
      },
      confirmed: {
        type: Sequelize.BOOLEAN
      },
      documentid: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'documents',
          key: 'id'
        }
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
    return queryInterface.dropTable('transactions');
  }
};