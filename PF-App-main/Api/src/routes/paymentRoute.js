let express = require("express");
let router = express.Router() ;
const processPayment = require('../controlers/processPayment')

router.post('/', processPayment)

module.exports = router;