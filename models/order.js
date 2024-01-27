const { DataTypes } = require('sequelize');
const dbConnect = require('../config/database');

const sequelize = dbConnect();

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Alfian',
  },
  totalPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Order;
