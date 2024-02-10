'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customerName: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Alfian',
      },
      customerPhone: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '085767113554',
      },
      customerAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Jakarta Utara',
      },
      totalPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};
