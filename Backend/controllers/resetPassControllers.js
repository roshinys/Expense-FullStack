const uuid = require("uuid");
const bcrypt = require("bcryptjs");

const saltRounds = 10;

const User = require("../models/User");
const ForgotPassword = require("../models/ForgotPass");
exports.updatePass = async (req, res) => {
  try {
    const resetpassid = req.params.id;
    const newpass = req.query.newpassword;
    const forgotPass = await ForgotPassword.findByPk(resetpassid);
    const user = await User.findByPk(forgotPass.userId);
    const newhashpass = await bcrypt.hash(newpass, saltRounds);
    await user.update({ password: newhashpass });
    forgotPass.isActive = false;
    await forgotPass.save();
    res
      .status(200)
      .json({ msg: "Successfully Changes Password", success: true });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Failed To Change Password", success: false });
  }
};

exports.forgotpass = async (req, res) => {
  try {
    const email = req.body.email;
    const users = await User.findAll({ where: { email: email } });
    const user = users[0];
    if (!user) {
      throw new Error("user not in db");
    }
    const id = uuid.v4();
    await ForgotPassword.create({
      id,
      isActive: true,
      userId: user.id,
    });
    res
      .status(200)
      .json({ msg: true, link: `${process.env.URL}/resetPass/${id}` });
  } catch (err) {
    console.log(err);
    res.status(404).json({ success: false, msg: "Sent Email Successfully" });
  }
};

exports.resetPass = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await ForgotPassword.findByPk(id);
    if (!response.isActive) {
      throw new Error("cant use the same link again to change pass");
    }
    res.status(200).send(`<html>
                                <script>
                                    function formsubmitted(e){
                                        e.preventDefault();
                                        console.log('called')
                                    }
                                </script>
                                <form action="${process.env.URL}/updatepassword/${id}" method="get">
                                    <label for="newpassword">Enter New password</label>
                                    <input name="newpassword" type="password" required></input>
                                    <button>reset password</button>
                                </form>
                            </html>`);
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "smtg went wrong" });
  }
};
