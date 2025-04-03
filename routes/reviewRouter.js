const express = require('express')
const Router = express.Router()
const reviewController = require('../controllers/reviewController')
const Authorization = require('../authMiddleware')

Router.post('/all', Authorization, reviewController.getAllReviews)
Router.post('/add', Authorization, reviewController.addReview)
Router.delete('/delete', Authorization, reviewController.deleteReview)
Router.put('/update', Authorization, reviewController.updateReview)


module.exports = Router