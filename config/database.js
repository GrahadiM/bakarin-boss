const { Sequelize } = require('sequelize');

function dbConnect() {
  const sequelize = new Sequelize(
    process.env.DB_DATABASE || 'db_bakarin_boss',
    process.env.DB_USERNAME || 'root',
    process.env.DB_PASSWORD || '',
    {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      dialect: process.env.DB_CONNECTION || 'mysql',
    }
  );

  return sequelize;
}

module.exports = dbConnect;