const {
  listProducts,
  productsByCategory,
  productsByBrand,
  productById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
  logicDeleteProduct,
  productByName
} = require("../controlers/products");
const express = require("express");
const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const {search} = req.query
    const listAllProducts = await listProducts();
    if (search){
      
      const foundProduct =  await searchProduct(listAllProducts, search)
      return res.status(200).json(foundProduct)
    }
    
    res.status(200).json(listAllProducts);
  } catch (error) {
    res.status(400).json("no ok");
  }
});
router.get("/category", async (req, res) => {
  const { category } = req.query;
  try {
    const filteredProducts = await productsByCategory(category);
    res.status(200).json(filteredProducts);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/brand", async (req, res) => {
  const { brand } = req.query;
  try {
    const filteredProducts = await productsByBrand(brand);
    res.status(200).json(filteredProducts);
  } catch (error) {
    res.status(400).json("no ok");
  }
});

//Busca el producto por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

//crea un nuevo producto
router.post("/", async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = await createProduct(productData);
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});
//actualiza un producto
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await updateProduct(id, req.body);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});
//borra un producto
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await deleteProduct(id);

    if (!product) {
      res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
//borrado lógico de un proucto
router.put("hide/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await logicDeleteProduct(id);

    if (!product) {
      res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product hided successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
//Busca el producto por name
router.get("/name/:name", productByName);

module.exports = router;
