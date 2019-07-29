'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('organizations', [{
        name: 'Administrador',
        email: 'cledianoestefenon@gmail.com',
        password: bcrypt.hashSync('password'),
        oidPhoto: '',
        passwordResetToken: '',
        passwordResetExpired: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('organizations', null, {});
  }
};
