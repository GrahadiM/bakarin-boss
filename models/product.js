const { DataTypes } = require('sequelize');
const dbConnect = require('../config/database');

const sequelize = dbConnect();

const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
});

module.exports = Product;
