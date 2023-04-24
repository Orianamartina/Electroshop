const { discount_campaign } = require("mercadopago");
const { Product, ShoppingCart_Products, User } = require("../db");

module.exports = {
  addProductToShoppingCart: async function (productId, userId) {
    try {
      let newQuantity = 1;
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });
      const cart = await user.getShoppingCart();
      const product = await Product.findByPk(productId);
      const productStock = product.stock;
      
      const cartProducts = await cart.getProducts({ where: { id: productId } });

      if (productStock > 0) {
        if (cartProducts.length) {
          if (cartProducts[0].ShoppingCart_Products.quantity < productStock) {
            newQuantity = cartProducts[0].ShoppingCart_Products.quantity + 1;
            const productAdded = cart.addProduct(cartProducts[0], {
              through: { quantity: newQuantity },
            });
           
            cart.totalPrice = cart.totalPrice + cartProducts[0].price
            cart.discountPrice = cart.discountPrice + cartProducts[0].price
            cart.save()
            return "Product added";
          } else {
            throw new Error();
          }
        }
        const product = await Product.findByPk(productId)
        cart.addProduct(product, {
            through: { quantity: newQuantity },
          });
          cart.totalPrice = cart.totalPrice + product.price
          cart.discountPrice = cart.discountPrice + product.price
          cart.save()

       
        return "Product added";
      }
    } catch (Error) {
      return "Stock limit reached";
    }
  },
  changeQuantityOfProduct: async function (productId, userId, action) {
    try {
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });
     

      const cart = await user.getShoppingCart();
      const cartProduct = await cart.getProducts({ where: { id: productId } });

      const productQuantity = cartProduct[0].ShoppingCart_Products.quantity;
    
      
      if (action === "del") {
  
        cart.totalPrice = cart.totalPrice - cartProduct[0].price * cartProduct[0].ShoppingCart_Products.quantity
        cart.discountPrice = cart.discountPrice - cartProduct[0].price * cartProduct[0].ShoppingCart_Products.quantity  
        await cart.save().then(cartProduct[0].ShoppingCart_Products.destroy())
       
        
        return "Product Deleted";
      }
      if (action == "sub") {
        if (productQuantity == 1) {

          cart.totalPrice = cart.totalPrice - cartProduct[0].price 
          cart.discountPrice = cart.discountPrice - cartProduct[0].price 
          await cart.save()
          await cartProduct[0].ShoppingCart_Products.destroy();
          
          
          return "Product deleted";
        } else {
          
          cart.totalPrice = cart.totalPrice - cartProduct[0].price 
          cart.discountPrice = cart.discountPrice - cartProduct[0].price 
          await cart.save()
          await cart.addProduct(cartProduct, {
            through: { quantity: productQuantity - 1 },
          });
          return "-1";
        }
      }
    } catch (error) {
      return error;
    }
  },
  
  applyDiscount: async function(string, userId){
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    const cart = await user.getShoppingCart(); 
    const discountPrice = cart.discountPrice
    const totalPrice = cart.totalPrice

    try {
      if (string.toLowerCase() == "desc10"){
      cart.discountPrice = totalPrice * (1 - 10/100)
      cart.save()
      return cart.discountPrice
      }
      if (string.toLowerCase() == "electroshop"){
        cart.discountPrice = totalPrice * (1 - 15/100)
        cart.save()
        return cart.discountPrice
      }
      if (string.toLowerCase() == "pfaprobado"){
        cart.discountPrice = totalPrice * (1 - 99/100)
        cart.save()
        return cart.discountPrice
      }
      if (string.toLowerCase() == ""){
        cart.discountPrice =  cart.totalPrice
        cart.save()
        return cart.discountPrice
      }
      else{
        return 0
      }
      
    } catch (error) {
      return error

    }
  },

  getShoppingCart: async function (userId) {
    try {
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });
      const cart = await user.getShoppingCart();
      const cartProducts = await cart.getProducts();
      let totalPrice = cart.totalPrice
      let discountPrice = cart.discountPrice
      let totalQuantity = 0;
      
      for (let product of cartProducts) {
        totalQuantity += product.ShoppingCart_Products.quantity;
      }
      return { cartProducts, totalPrice: totalPrice, discountPrice: discountPrice, totalQuantity };
    } catch (error) {
      return error;
    }
  },
  emptyShoppingCart: async function (userId) {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    const cart = await user.getShoppingCart();
    
    const cartProducts = await cart.getProducts();

    await ShoppingCart_Products.destroy({
      where: {
        ShoppingCartId: cart.id,
      },
    });
    cart.totalPrice = "0"
    cart.discountPrice = "0"
    cart.save()
    return "cart empty";
  },
};
