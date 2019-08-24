'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('intersteds', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      publickey: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('intersteds');
  }
};