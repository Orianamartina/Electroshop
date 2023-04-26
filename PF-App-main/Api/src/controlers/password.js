const { User } = require("../db");;
const bcrypt = require("bcrypt");
const { getTokenData } = require("../config/jwt.config");
const { sendEmail, getForgotPassTemplate } = require("../config/mail.config")
const SALT = 10;

module.exports = {
  
  forgotPassword: async (req, res) => {
    const { token } = req.body;
    console.log(token);
    const data = getTokenData(token);
    const { email } = data;
    console.log(data);
    try {
      let user = await User.findOne({
        where: {
          email,
        },
      });
      if (user) {
        const template = getForgotPassTemplate(user.name, token);
        await sendEmail(email, "Reset your password", template);
        res.send({
          msg: "An email has been sent for you to restore your password",
        });
      } else {
        res.send({ msg: "No user registered with the email given" });
      }
    } catch (error) {
      res.send(error);
    }
  },


  resetPassword: async (req, res) => {
    const { email, password } = req.body;
    let passwordHashed = await bcrypt.hash(password, SALT);
    const search = await User.find({
      where: {
        email,
      },
    });
    if (search) {
      let user = search[0];
      user.password = passwordHashed;
      user.save();
      res.send({ msg: "Your new password has been set correctly" });
    } else {
      res.send({ msg: "No user registered with this email" });
    }
  },
};
