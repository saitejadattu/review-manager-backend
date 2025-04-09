const Review = require('../models/reviewModel')
const dotenv = require('dotenv')
dotenv.config()

const reviewController = {
    'getProductReview': async (request, response) => {
        try {
            const reviewList = await Review.find({ productId: request.body.productId })
            response.status(200).send({ reviewList: reviewList })
        } catch (e) {
            response.status(500).json({
                message: e.message
            })
        }

    },
    'getAllReviews': async (request, response) => {
        try {
            const reviewList = await Review.find()
            response.status(200).send({ reviewList: reviewList })
        } catch (e) {
            response.status(500).json({
                message: e.message
            })
        }

    },
    'addReview': async (request, response) => {
        console.log(request.body)
        try {
            const newComment = await Review(request.body)
            await newComment.save()
            response.status(201).json({
                message: 'review added successfully'
            })
        } catch (e) {
            response.status(500).json({
                message: e.message
            })
        }
    },
    'deleteReview': async (request, response) => {
        try {
            const { email } = request.payload
            const { reviewId } = request.body
            const user = await Review.deleteOne({ userId: email, _id: reviewId });
            response.status(201).json({ message: 'review deleted successfully' })
        } catch (e) {
            response.status(500).json({ message: e.message })
        }
    },
    'updateReview': async (request, response) => {
        try {
            const { email } = request.payload
            const { commentText, rating, reviewId } = request.body
            const user = await Review.findOneAndUpdate(
                { userId: email, _id: reviewId },
                { $set: { rating: rating, commentText: commentText } },
                { new: true }
            );
            response.status(201).json({ message: 'review updated successfully' })
        } catch (e) {
            response.status(500).json({ message: e.message })
        }
    }
}

module.exports = reviewController