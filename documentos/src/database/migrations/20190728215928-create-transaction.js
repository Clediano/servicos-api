'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      transaction: {
        type: Sequelize.STRING(1000)
      },
      height: {
        type: Sequelize.INTEGER
      },
      hash: {
        type: Sequelize.STRING(1000)
      },
      opreturn: {
        type: Sequelize.STRING(1000)
      },
      confirmations: {
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
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'documents',
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