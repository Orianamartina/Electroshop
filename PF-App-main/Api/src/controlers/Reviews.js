const {User , Product, Review} = require("../db");


module.exports = {
    createReview: async function(userId, text, rating, ProductId){
        try {
            const user = await User.findOne({
                where: {
                  id: userId,
                },
            })
            
            const review = await user.createReview({rating, text, ProductId})
        } catch (error) {
            return error
        }
    },
    getProductReview: async function(productId){
        
        try {
            const reviews = await Review.findAll({
            where: {
                ProductId: productId
            }
            })
            return reviews
        } catch (error) {
            return error
        }
    },
    getUserReviews: async function(userId){
        try {
            const reviews = await Review.findAll({
                where: {
                    UserId: userId
                }
            })
            return reviews
        } catch (error) {
            return error
        }
    },
    getProductAverage: async function(productId) {
        try {
            const reviews = await  Review.findAll({
                where: {
                    ProductId: productId
                }
                })
            

            let sum = 0
            const  max = reviews.length

            for (let i = 0; i < max; i++) {
                let rating = reviews[i].rating
                sum = sum + rating
               
            }
            return sum/max
        } catch (error) {
            return error
        }
    }
}