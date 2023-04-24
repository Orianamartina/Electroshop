const { PurchaseOrder, Order_Products, User } = require("../db");

module.exports = {
  createPurchaseOrder: async function (userId) {
    try {
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) return "user not found";

      const cart = await user.getShoppingCart();
      const cartProducts = await cart.getProducts();
      let productsData = cartProducts.map((product) => {
        product.Order_Products = {
          quantity: product.ShoppingCart_Products.quantity,
        };

        return product;
      });
      const totalPrice = cart.discountPrice
      const newOrder = await user.createPurchaseOrder({
        totalPrice: totalPrice,
      });
      newOrder.addProducts(productsData);
    } catch (error) {
      return error;
    }
  },

  getPurchaseOrderByUser: async function (userId) {
    try {
      const orders = await PurchaseOrder.findAll({
        where: {
          UserId: userId,
        },
      });
      const allOrders = []
    
      for (let i = 0; i < orders.length; i++) {
        let product = await orders[i].getProducts()
        allOrders.push(product)
        
      }
      
      return allOrders
      
      
    } catch (error) {
      return error;
    }
  },


  getAllPurchaseOrders: async function () {
    try {
      const allOrders = await PurchaseOrder.findAll();
      return allOrders;
    } catch (error) {
      return error;
    }
  },
  getPurchaseOrderById: async function (Id) {
    try {
      const foundOrder = await PurchaseOrder.findByPk(Id);
      if (!foundOrder) return "order not found";
      return foundOrder;
    } catch (error) {
      return error;
    }
  },
  updatePurchaseOrderState: async function (Id, status) {
    try {
      const foundOrder = await PurchaseOrder.findByPk(Id);
      foundOrder.status = status;
      foundOrder.save();
      return foundOrder;
    } catch (error) {
      return error;
    }
  },
};
