'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Alfian Firdaus',
        email: 'alfian@example.com',
        phone: '123456789',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hadoy',
        email: 'hadoy@example.com',
        phone: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more users as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
