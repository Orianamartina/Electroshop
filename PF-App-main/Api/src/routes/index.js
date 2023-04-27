const {Router} = require("express");

const products = require("./ProductsRoutes")
const user = require("./UserRoutes")
const shipping = require("./ShippingRoutes")
const shoppingCart = require("./ShoppingCartRoutes")
const order = require("./OrderRoutes")
const payment = require('./paymentRoute')
const review = require ("./ReviewRoutes")
const password = require("./PasswordRoutes")
const router = Router()

//
router.use("/products", products)
router.use("/user", user)
router.use("/shipping", shipping)
router.use("/cart", shoppingCart )
router.use("/order", order)
router.use('/payment', payment)
router.use("/review", review)
router.use('/password', password)
module.exports = router;