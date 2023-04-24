
const {
  addProductToShoppingCart,
  getShoppingCart,
  changeQuantityOfProduct,
  emptyShoppingCart,
  applyDiscount
} = require("../controlers/ShoppingCart");
const express = require("express");
const router = express.Router();
router.use(express.json());
//
router.post("/add", async (req, res) => {
  const { productId, userId } = req.body;

  try {
    const addProduct = await addProductToShoppingCart(productId, userId);

    return res.status(200).json(addProduct);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
router.post("/desc/", async (req, res) =>{
  const {string, userId} = req.body 
  try {
    const getDis = await applyDiscount(string, userId)
    if (getDis == 0) return res.status(400).json("codigo no valido")
    return res.status(200).json(getDis)
  } catch (error) {
    res.status(500).json("getDis")
  }
})

router.post("/:action", async (req, res) => {
  const { action } = req.params;
  const { productId, userId } = req.body;
  try {
    const deleteProduct = changeQuantityOfProduct(productId, userId, action);
    return res.status(200).json(deleteProduct);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    getCart = await getShoppingCart(userId);
    res.status(200).json(getCart);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
router.post("/empty/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const emptyCart = await emptyShoppingCart(userId);
    res.status(200).json(emptyCart);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

//
module.exports = router;
