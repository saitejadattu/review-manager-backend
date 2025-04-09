const express = require('express')
const Router = express.Router()
const reviewController = require('../controllers/reviewController')
const Authorization = require('../authMiddleware')

Router.post('/product-review', Authorization, reviewController.getProductReview)
Router.post('/add', Authorization, reviewController.addReview)
Router.delete('/delete', Authorization, reviewController.deleteReview)
Router.put('/update', Authorization, reviewController.updateReview)
Router.get('/all', reviewController.getAllReviews)

module.exports = Router