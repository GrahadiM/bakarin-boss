"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "Sosis Bratwurst Bakar",
          price: 20000,
          img: "/template/img/product/1.jpg",
        },
        {
          name: "Baso Bakar",
          price: 15000,
          img: "/template/img/product/2.jpg",
        },
        {
          name: "Dumpling Ayam",
          price: 25000,
          img: "/template/img/product/3.jpg",
        },
        {
          name: "Dumpling Keju",
          price: 15000,
          img: "/template/img/product/4.jpg",
        },
        {
          name: "Scallop",
          price: 15000,
          img: "/template/img/product/5.jpg"
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
