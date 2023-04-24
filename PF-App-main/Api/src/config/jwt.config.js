const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const secret = process.env.JWT_KEY;
module.exports = {
generateToken: (payload) => {
  if (secret === undefined) {
    throw new Error("JWT_KEY not defined");
  } else {
    return jwt.sign(payload, secret || "", { expiresIn: "1h" });
  }
},

getTokenData: (token) => {
  let data = null;
  try {
    data = jwt.verify(token, secret || "");
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      data = { message: "Token expired" };
    } else if (error instanceof jwt.JsonWebTokenError) {
      data = { message: "Invalid token" };
    }
  }
  return data;
}
}
