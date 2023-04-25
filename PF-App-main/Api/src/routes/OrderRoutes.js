const express = require("express");
const router = express.Router();

const {
  createPurchaseOrder,
  getAllPurchaseOrders,
  getPurchaseOrderByUser,
  getPurchaseOrderById,
  updatePurchaseOrderState,
} = require("../controlers/PurchaseOrder");

/* crear orden de compra*/
router.post("/create", async (req, res) => {
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
  try {
    const createOrder = createPurchaseOrder(userId, street, number, postCode, apartment, floor, city, state, country);
    res.status(200).json("Order created");
  } catch (error) {
    res.status(400).json("oops");
  }
});

/* buscar todas las ordenes de compras o por usuario o por nombre */
router.get("/user/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    
    const userOrders = await getPurchaseOrderByUser(userid);
  
    return res.status(200).json(userOrders);
    
  } catch (error) {
    return res.status(400).json("Error fetching all shopping orders");
  }
});

router.get("/:orderId", async(req, res) =>{
  try {
    const {orderId} = req.params
    const orderById = await getPurchaseOrderById(orderId);
    return res.status(200).json(orderById);
    
  } catch (error) {
    return res.status(400).json("Error fetching all shopping orders");
  }
}
)
router.get("/", async(req, res) => {
  try {
    allOrders = await getAllPurchaseOrders();
    return res.status(200).json(allOrders);
    
  } catch (error) {
    return res.status(400).json("Error fetching all shopping orders");
  }
}
)

/* buscar ordenes de compra de un usuario */

router.put("/status", async (req, res) => {
  try {
    const { orderId, newStatus } = req.body;
    const updated = updatePurchaseOrderState(orderId, newStatus);
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(400).json("Error updating status");
  }
});


//

module.exports = router;
