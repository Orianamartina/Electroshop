const express = require("express");
const { forgotPassword, resetPassword }= require("../controlers/password");

const router = express.Router()

router.post("/forgot", forgotPassword)
router.put("/reset", resetPassword)

module.exports = router;