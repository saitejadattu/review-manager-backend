const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    commentText: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
},
    { timestamps: true, strict: false }
);

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review