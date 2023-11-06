const mongoose = require('mongoose');

const errors = require('../constants/errorMessages/recipeErrors');

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
        validate: [{
            validator: function (ingredients) {
                return ingredients.length >= 2 && ingredients.length <= 30;
            },
            message: errors.recipeIngredientsCountError(2, 30)
        }]
    }],
    steps: [{
        type: String,
        required: [true, errors.recipeStepsRequiredError],
        validate: [{
            validator: function (steps) {
                return steps.length >= 2 && steps.length <= 30;
            },
            message: errors.recipeStepsCountError(2, 30)
        }]
    }],
    youtubeLink: {
        type: String,
        match: /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: [true, errors.recipeOwnerRequiredError],
        ref: 'User',
    },
    category: {
        type: mongoose.Types.ObjectId,
        required: [true, errors.recipeCategoryRequiredError],
        ref: 'Category',
    },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;