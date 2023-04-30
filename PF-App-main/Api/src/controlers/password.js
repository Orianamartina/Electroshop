const { User } = require("../db");;
const bcrypt = require("bcrypt");
const { sendEmail, templateChangePassword } = require("../config/mail.config")
const { generateToken } = require("../config/jwt.config");
const SALT = 10;

module.exports = {
  
  resetPassword: async (req, res) => {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        where: {
          email,
        },
      });
      if (user) {
        let passwordHashed = await bcrypt.hash(password, 10);
        const token = generateToken({ email, passwordHashed });
        const template = templateChangePassword(user.name, token);
        await sendEmail(email, "Confirm password change", template);
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

};
