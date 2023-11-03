const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
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
        required: true,
    },
    ingredients: [{
        type: String,
        required: true,
    }],
    steps: [{
        type: String,
        required: true,
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    category: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Category',
    },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;