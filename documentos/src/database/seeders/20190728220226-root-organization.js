'use strict';

const bcrypt = require('bcryptjs');
const uuid = require('uuid/v4');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('organizations', [{
        id: uuid(),
        name: 'Administrador',
        email: 'cledianoestefenon@gmail.com',
        password: bcrypt.hashSync('password'),
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
