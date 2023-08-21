require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: false }));

//db
// const Sequelize = require("sequelize");
const sequelize = require("./util/database");

//routes
const authRoutes = require("./routes/authRoutes.js");

//routes
app.use("/auth", authRoutes);

sequelize
  .sync()
  // .sync({ force: true })
  .then(() => {
    app.listen(8000, () => {
      console.log("server started at port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
