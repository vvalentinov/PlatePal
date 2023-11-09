const mongoose = require('mongoose');

const starRatingSchema = new mongoose.Schema({
    value: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    recipeId: {
        type: mongoose.Types.ObjectId,
        ref: 'Recipe',
        required: true,
    },
});

const StarRating = mongoose.model('StarRating', starRatingSchema);

module.exports = StarRating;