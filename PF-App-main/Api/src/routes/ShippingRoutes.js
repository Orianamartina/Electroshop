const express = require("express");
const router = express.Router();
const {
  createShippingAddress,
  getShippingAddressFromOrder,
} = require("../controlers/ShippingAddress");
router.use(express.json());

router.post("/", async (req, res) => {
  try {
    const {
      userId,
      street,
      number,
      postCode,
      apartment,
      floor,
      city,
      state,
      country,
    } = req.body;
    
    const addShippingAddress = await createShippingAddress(
      userId,
      street,
      number,
      postCode,
      apartment,
      floor,
      city,
      state,
      country
    );
    return res.status(200).json(addShippingAddress);
  } catch (error) {
    return res
      .status(400)
      .json("there was a problem adding the shipping address");
  }
});
router.get("/:orderId", async (req, res) => {
  const { orderId } = req.params;
  try {
    const getOrderShipping = await getShippingAddressFromOrder(orderId);
    return res.status(200).json(getOrderShipping);
  } catch (error) {
    return res.status(400).json("Can't find the order");
  }
});

module.exports = router;
