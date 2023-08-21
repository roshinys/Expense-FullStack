const { Sequelize } = require("sequelize");
const sequelize = require("../util/database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    len: [6, 255],
  },
  isPremium: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;
