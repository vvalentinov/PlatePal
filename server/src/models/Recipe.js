const mongoose = require('mongoose');

const errors = require('../constants/errorMessages/recipeErrors');

const {
    RecipeModelName,
    CategoryModelName,
    UserModelName,
    CommentModelName
} = require('../constants/dbModelsNames');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, errors.recipeNameRequiredError],
        minLength: [5, errors.recipeNameMinLengthError(5)],
        maxLength: [100, errors.recipeNameMaxLengthError(100)]
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
        ref: UserModelName,
    },
    category: {
        type: mongoose.Types.ObjectId,
        required: [true, errors.recipeCategoryRequiredError],
        ref: CategoryModelName,
    },
    comments: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: CommentModelName,
        }],
        default: [],
    },
});

const Recipe = mongoose.model(RecipeModelName, recipeSchema);

module.exports = Recipe;