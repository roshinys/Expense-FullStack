const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const userid = jwt.verify(token, "monkeydluffy");
    User.findByPk(userid)
      .then((user) => {
        console.log(JSON.stringify(user));
        console.log("hereee");
        req.user = user;
        next();
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false });
  }
};

module.exports = {
  authenticate,
};
