const mongoose = require('mongoose');

const errors = require('../constants/errorMessages/recipeErrors');

const modelsNames = require('../constants/dbModelsNames');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, errors.recipeNameRequiredError],
        minLength: [2, errors.recipeNameMinLengthError(2)],
        maxLength: [100, errors.recipeNameMaxLengthError(100)],
        match: [/^[a-zA-Z0-9\s]*$/, 'Recipe name must contain only letters, numbers or spaces!']
    },
    description: {
        type: String,
        required: [true, errors.recipeDescriptionRequiredError],
        minLength: [20, errors.recipeDescriptionMinLengthError(20)],
        maxLength: [530, errors.recipeDescriptionMaxLengthError(530)]
    },
    image: {
        publicId: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    cookingTime: {
        type: Number,
        required: [true, errors.recipeCookingTimeRequiredError],
        min: [5, errors.recipeCookingTimeMinError(5)],
        max: [1440, errors.recipeCookingTimeMaxError(1440)]
    },
    ingredients: [{
        type: String,
        required: [true, errors.recipeIngredientsRequiredError],
    }],
    steps: [{
        type: String,
        required: [true, errors.recipeStepsRequiredError],
    }],
    youtubeLink: {
        type: String,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: [true, errors.recipeOwnerRequiredError],
        ref: modelsNames.UserModelName,
    },
    category: {
        type: mongoose.Types.ObjectId,
        required: [true, errors.recipeCategoryRequiredError],
        ref: modelsNames.CategoryModelName,
    },
    averageRating: {
        type: Number,
        required: true,
        default: 0,
    },
    ratings: [{
        type: mongoose.Types.ObjectId,
        ref: 'StarRating',
    }],
    isApproved: {
        type: Boolean,
        required: true,
        default: false,
    },
});

const Recipe = mongoose.model(modelsNames.RecipeModelName, recipeSchema);

module.exports = Recipe;