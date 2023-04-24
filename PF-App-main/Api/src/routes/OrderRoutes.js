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
router.post("/create/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const createOrder = createPurchaseOrder(userId);
    res.status(200).json("Order created");
  } catch (error) {
    res.status(400).json("oops");
  }
});

/* buscar todas las ordenes de compras o por usuario o por nombre */
router.get("/", async (req, res) => {
  try {
    const { userId, orderId } = req.query;
    if (userId) {
      const userOrders = await getPurchaseOrderByUser(userId);
      return res.status(200).json(userOrders);
    }
    if (orderId) {
      const orderById = await getPurchaseOrderById(orderId);
      return res.status(200).json(orderById);
    }
    allOrders = await getAllPurchaseOrders();
    return res.status(200).json(allOrders);
  } catch (error) {
    return res.status(400).json("Error fetching all shopping orders");
  }
});

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
