const { PurchaseOrder, ShippingAddress,  } = require("../db");

module.exports = {

  createShippingAddress:async (orderId, street, number, postCode, apartment, floor, city, state, country) =>{
       try {
          
          const create = await ShippingAddress.create({
          id: orderId,
          street: street,
          number: number, 
          postCode: postCode,
          apartment: apartment,
          floor: floor,
          city: city, 
          state: state,
          country: country,
        })
        console.log("Hola")
        return create
       } catch (error) {
        return error
       }
      
      
  },
  getShippingAddressFromOrder:async(orderId) => {
    const order = await PurchaseOrder.findOne({
      where:{
        id: orderId
      }
    })
    const address = await order.getShippingAddress()
    return address
  },

}