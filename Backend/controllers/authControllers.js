const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 8;

exports.postUser = async (req, res) => {
  try {
    const email = req.body.email;
    if (!email.includes("@")) {
      throw new Error("not a valid email");
    }
    const password = req.body.password;
    if (!email || !password) {
      throw new Error("input needed backend");
    }
    if (req.user) {
      res.json({ success: false, msg: "already logged in" });
      return;
    }
    const hashPass = await bcrypt.hash(password, saltRounds);
    const newuser = await User.create({
      email: email,
      password: hashPass,
    });
    req.user = newuser;
    const jwttoken = generateToken(newuser.id);
    res.json({
      success: true,
      msg: "Successfully registered",
      token: jwttoken,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "Something went wrong" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findAll({ where: { email: email } });
    if (user.length === 0) {
      res.status(404).json({ success: false, msg: "no user exists" });
      return;
    }
    const result = await bcrypt.compare(password, user[0].password);
    if (!result) {
      res.status(401).json({ success: false, msg: "Wrong Password" });
      return;
    }
    const userId = user[0].id;
    const isPremium = user[0].isPremium;
    const jwttoken = generateToken(userId);
    return res.json({
      token: jwttoken,
      success: true,
      msg: "Successfully Logged In",
      userId: userId,
      isPremium,
    });
  } catch (error) {
    console.log(error);
    res.json({ msg: "Failed to login", success: false, error });
  }
};

function generateToken(id) {
  return jwt.sign(id, "monkeydluffy");
}
