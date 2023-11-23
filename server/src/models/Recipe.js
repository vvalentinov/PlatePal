const mongoose = require('mongoose');

const errors = require('../constants/errorMessages/recipeErrors');

const modelsNames = require('../constants/dbModelsNames');

const regexes = require('../constants/regexes/regexes');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, errors.recipeNameRequiredError],
        minLength: [2, errors.recipeNameMinLengthError(2)],
        maxLength: [100, errors.recipeNameMaxLengthError(100)],
        match: [regexes.recipeNameRegex, errors.recipeNameMatchError]
    },
    description: {
        type: String,
        required: [true, errors.recipeDescriptionRequiredError],
        minLength: [20, errors.recipeDescriptionMinLengthError(20)],
        maxLength: [530, errors.recipeDescriptionMaxLengthError(530)]
    },
    image: {
        publicId: { type: String },
        url: { type: String },
    },
    prepTime: {
        type: Number,
        cast: 'Prep Time must be a number!',
        required: [true, errors.recipePrepTimeRequiredError],
        min: [5, errors.recipePrepTimeRangeError(5, 1440)],
        max: [1440, errors.recipePrepTimeRangeError(5, 1440)]
    },
    cookingTime: {
        type: Number,
        cast: 'Cooking Time must be a number!',
        required: [true, errors.recipeCookingTimeRequiredError],
        min: [5, errors.recipeCookingTimeMinError(5)],
        max: [1440, errors.recipeCookingTimeMaxError(1440)]
    },
    servings: {
        type: Number,
        cast: 'Servings must be a number!',
        required: [true, errors.recipeServingsRequiredError],
        min: [1, errors.recipeServingsRangeError(1, 100)],
        max: [100, errors.recipeServingsRangeError(1, 100)]
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
        match: [regexes.recipeYoutubeLinkRegex, errors.recipeYoutubeLinkFormatError]
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
        ref: modelsNames.StarRatingModelName,
    }],
    isApproved: {
        type: Boolean,
        required: true,
        default: false,
    },
});

const Recipe = mongoose.model(modelsNames.RecipeModelName, recipeSchema);

module.exports = Recipe;