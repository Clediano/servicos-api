'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('organizations', [{
        id: '611dbd62-8ba4-498c-8447-f733c89c31ff',
        name: 'Administrador',
        email: 'cledianoestefenon@gmail.com',
        password: bcrypt.hashSync('123'),
        oidphoto: '',
        passwordresettoken: '',
        passwordresetexpired: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('organizations', null, {});
  }
};
