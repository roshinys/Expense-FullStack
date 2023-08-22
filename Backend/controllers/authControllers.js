const User = require("../models/User");
const bcrypt = require("bcryptjs");
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

exports.updateUser = async (req, res) => {
  try {
    const { username, imgUrl } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found.", success: false });
    }
    user.username = username;
    user.imgUrl = imgUrl;
    await user.save();
    res.json({ msg: "Successfully updated user details", success: true });
  } catch (error) {
    console.log(err);
    res.json({ msg: "Failed to update user details", success: false });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    return res.json({
      message: "fetched user detail",
      success: true,
      username: req.user.username,
      imgUrl: req.user.imgUrl,
    });
  } catch (error) {
    console.log(err);
    res.json({ msg: "Failed to get user details", success: false });
  }
};

function generateToken(id) {
  return jwt.sign(id, "monkeydluffy");
}
