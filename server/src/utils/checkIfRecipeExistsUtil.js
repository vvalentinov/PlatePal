const Recipe = require('../models/Recipe');

exports.checkIfRecipeExists = async (recipeId) => {
    const regex = new RegExp(/^[0-9a-fA-F]{24}$/);
    if (!regex.test(recipeId)) {
        throw new Error('Invalid recipe id format!');
    }

    const recipeExists = await Recipe.exists({ _id: recipeId });
    if (!recipeExists) {
        throw new Error('Recipe with given id not found!');
    }
};