const { PurchaseOrder, User, ShippingAddress } = require("../db");

module.exports = {
  createPurchaseOrder: async function (userId, street, number, postCode, apartment, floor, city, state, country) {
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
      const shipping = await ShippingAddress.findOne({where:
      {
          street: street,
          number: number, 
          postCode: postCode,
          apartment: apartment,
          floor: floor,
          city: city, 
          state: state,
          country: country,
      }})
      
      if (shipping){
        newOrder.ShippingAddressId = shipping.id
        await newOrder.save()

       
      }
      else{
        await newOrder.createShippingAddress({
          
          street: street,
          number: number, 
          postCode: postCode,
          apartment: apartment,
          floor: floor,
          city: city, 
          state: state,
          country: country,
      })
      }
       
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
        let orderId = orders[i].id
        let userId = orders[i].UserId
        let date  = orders[i].date
        let totalPrice = orders[i].totalPrice
        let status = orders[i].status
        allOrders.push({orderId: orderId, userId: userId, products: product, date: date, totalPrice: totalPrice, status: status})
        
      }
   
      return allOrders
      
      
    } catch (error) {
      return error;
    }
  },


  getAllPurchaseOrders: async function () {
    try {
      const orders = await PurchaseOrder.findAll();
      
      const allOrders = []
    
      for (let i = 0; i < orders.length; i++) {
        let product = await orders[i].getProducts()
        let date  = orders[i].date
        let totalPrice = orders[i].totalPrice
        let orderId = orders[i].id
        let status = orders[i].status
        let userId = orders[i].UserId
        allOrders.push({orderId: orderId, userId: userId, products: product, date: date, totalPrice: totalPrice, status: status})
        
      }
      
      return allOrders
    } catch (error) {
      return error;
    }
  },
  getPurchaseOrderById: async function (Id) {
    try {
      const foundOrder = await PurchaseOrder.findByPk(Id);
      let product = await foundOrder.getProducts()
      let date  = foundOrder.date
      let totalPrice = foundOrder.totalPrice
      let orderId = foundOrder.id
       let userId = foundOrder.UserId
      let status = foundOrder.status
      if (!foundOrder) return "order not found";
      return ({orderId: orderId, userId: userId, products: product, date: date, totalPrice: totalPrice, status:status});
    } catch (error) {
      return error;
    }
  },
  updatePurchaseOrderState: async function (Id, status) {
    try {
      const foundOrder = await PurchaseOrder.findByPk(Id);
      foundOrder.status = status;
      foundOrder.save();
      return foundOrder.status;
    } catch (error) {
      return error;
    }
  },
};
