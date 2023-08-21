const Sequelize = require("sequelize");

const sequelize = new Sequelize("expensetracker", "root", "433842", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
