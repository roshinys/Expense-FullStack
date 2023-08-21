require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: false }));

//db
// const Sequelize = require("sequelize");
const sequelize = require("./util/database");

//routes
const authRoutes = require("./routes/authRoutes.js");
const expenseRoutes = require("./routes/expenseRoutes.js");
const purchaseRoutes = require("./routes/purchaseRoutes.js");
const resetPassRoutes = require("./routes/resetPassRoutes");

//routes
app.use("/auth", authRoutes);
app.use("/expense", expenseRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/", resetPassRoutes);

//models
const User = require("./models/User");
const Expense = require("./models/Expense");
const Order = require("./models/Order");
const ForgotPass = require("./models/ForgotPass");

//One to many Relationship
User.hasMany(Expense);
Expense.belongsTo(User);

//User Can have many orders
User.hasMany(Order);
Order.belongsTo(User);

//
User.hasMany(ForgotPass);
ForgotPass.belongsTo(User);

sequelize
  .sync()
  // .sync({ force: true })
  .then(() => {
    app.listen(8000, () => {
      console.log("server started at port 8000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
