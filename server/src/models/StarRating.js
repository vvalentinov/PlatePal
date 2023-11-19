const mongoose = require('mongoose');

const modelNames = require('../constants/dbModelsNames');

const errors = require('../constants/errorMessages/starRatingErrors');

const starRatingSchema = new mongoose.Schema({
    value: {
        type: Number,
        required: [true, errors.ratingValueRequiredError],
        min: [1, errors.ratingValueError(1, 5)],
        max: [5, errors.ratingValueError(1, 5)],
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: modelNames.UserModelName,
        required: [true, errors.ratingUserIdRequiredError],
    },
    recipeId: {
        type: mongoose.Types.ObjectId,
        ref: modelNames.RecipeModelName,
        required: [true, errors.ratingRecipeIdRequiredError],
    },
});

const StarRating = mongoose.model(modelNames.StarRatingModelName, starRatingSchema);

module.exports = StarRating;