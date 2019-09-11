'use strict';

const { criptografar } = require('../../cryptography');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('wallets', [{
      id: '02676dc4-d9bc-4245-bf3a-f49e546ecb57',
      publickey: '0378ce998c70874038c8dbb50dbbd7c3c368406de472e2f5104cafea0fb9374eec',
      privatekey: criptografar('76177fb0d746e30f434de33fb61fbf282e3a72d2eda85d2eadcd25efae356636'),
      wif: 'cRYFqdhVmgWnPvFYkN5KJzEeqiL6JUbbcjqgDGLDXdgSah8H9VgW',
      address: 'muqAX5We6EEhykAzie8hHuBVzHxaZ2U25D',
      organizationid: '611dbd62-8ba4-498c-8447-f733c89c31ff',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('wallets', null, {});
  }
};
