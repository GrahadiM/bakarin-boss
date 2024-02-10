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
  customerPhone: {
    type: DataTypes.STRING,
    allowNull: false,
    // defaultValue: '085767113554',
  },
  customerAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    // defaultValue: 'Jakarta Utara',
  },
  totalPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Order;
