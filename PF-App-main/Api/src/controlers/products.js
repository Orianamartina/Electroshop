const api = require("../jsonProducts.js");
const { Product } = require("../db");
module.exports = {
  addProducts: async function () {
    const allProducts = await Product.count();
    if (allProducts < 1) {
      let obj = {};
      let filtrado = api.map((e) => {
        obj = {
          name: e.name,
          price: e.price,
          image: e.image,
          brand: e.brand,
          description: e.description,
          stock: e.stock,
          category: e.category
        };
        return obj;
      });
      await Product.bulkCreate(filtrado);
    }
  },

  listProducts: async function () {
    const dbProducts = await Product.findAll({
      where: {
        disable: false
      }
    });
    // console.log(dbProducts)
    return dbProducts;
  },
  productsByCategory: async function (category){
    const filtered = await Product.findAll({
      where:{
        category
      }
    })
    return filtered
  },
  productsByBrand: async function (brand){
    const filtered = await Product.findAll({
      where:{
        brand
      }
    })
    return filtered
  },
  productById: async function (id) {
    const product = await Product.findOne({
      where: {
        id
      }
    });
    return product;
  },
  productByName: async (req, res) => {
    const { name } = req.params
    console.log(name)
    try {
      const product  = await Product.findOne({
        where: {
          name
        }
      })
      if (product){
        return res.status(200).json(product)
      }else{
        return res.send({})
      }
      
    } catch (error) {
      return res.send("oops")
    }
    
  },
  createProduct: async function (productData) {

    const verified = await Product.findOne({
      where:{
        name: productData.name
      }
    })
    if (verified){
      verified.brand = productData.brand;
      verified.price = productData.price;
      verified.image = productData.image;
      verified.description = productData.description;
      verified.stock = verified.stock + productData.stock;
      verified.disable = false;
      verified.save();
    }else {
      const newProduct = await Product.create(productData);
      return newProduct;
    }

  },
  updateProduct: async function (id, updatedData) {
    const [rowsUpdated, [updatedProduct]] = await Product.update(updatedData, {
      where: { id },
      returning: true // Devuelve el objeto actualizado en la respuesta
    });
    if (rowsUpdated !== 1) {
      throw new Error(`No se pudo actualizar el producto con ID ${id}`);
    }
    return updatedProduct;
  },
  logicDeleteProduct: async function (id) {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return { error: 'Product not found' };
      }
      product.disable = true
      await product.save();
      return { message: 'Product hided successfully' };
    } catch (error) {
      console.error(error);
      return { error: 'Server error' };
    }
  },
  deleteProduct: async function (id) {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return { error: 'Product not found' };
      }
      await product.destroy();
      return { message: 'Product deleted successfully' };
    } catch (error) {
      console.error(error);
      return { error: 'Server error' };
    }
  },
  searchProduct: async function(array, text){

      try {
        const lowerCase = text.toLowerCase()
        foundProducts = array.filter(product => product.name.toLowerCase().includes(lowerCase))

        return foundProducts
      } catch (error) {
          return { error: 'Server error' };
      }
  },
 

};
