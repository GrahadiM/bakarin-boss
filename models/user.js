const { DataTypes } = require('sequelize');
const dbConnect = require('../config/database');

const sequelize = dbConnect();

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING, // Atur tipe data sesuai kebutuhan Anda
  },
});

module.exports = User;
