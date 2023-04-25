const {
    createReview,
    getProductReview,
    getUserReviews,
    getProductAverage
  } = require("../controlers/Reviews.js");
const express = require("express");
const router = express.Router();
router.use(express.json());

router.post("/", async (req, res) => {
    const {userId, text, rating, ProductId} = req.body
    try { 
        const newReview = await createReview(userId, text, rating, ProductId)
        
        return res.status(200).json(newReview)
    } catch (error) {
        return res.status(500).json("server error")
    }
});
router.get("/product/:productId", async(req, res)=>{
    const {productId} = req.params
    try {
        const products = await getProductReview(productId)
        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json("server error")
    }
})
router.get("/user/:userId", async(req, res) =>{
    const {userId} = req.params 
    try {
        const userReviews = await getUserReviews(userId)
        return res.status(200).json(userReviews)
    } catch (error) {
        return res.status(500).json("server error")
    }
})
router.get("/average/:productId", async (req, res) =>{
    const {productId} = req.params
    try {
        const average = await getProductAverage(productId)
        return res.status(200).json(average)
    } catch (error) {
        return res.status(500).json("server error")
    }
})
router.delete("/delete/:reviewId", async (req, res) => {
    const {reviewId} = req.params
    try {
        
    } catch (error) {
        
    }
})

  module.exports = router;