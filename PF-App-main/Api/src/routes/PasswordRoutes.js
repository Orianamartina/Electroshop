const express = require("express");
const { resetPassword }= require("../controlers/password");

const router = express.Router()

router.post("/reset", resetPassword)

module.exports = router;