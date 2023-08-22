const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "expensetracker",
  process.env.DBUSER,
  process.env.DBPASS,
  {
    host: process.env.DBHOST,
    dialect: "mysql",
  }
);

module.exports = sequelize;
