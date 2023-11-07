const Recipe = require('../models/Recipe');

const { getById } = require('../managers/categoryManager');

exports.recipeValidator = async (data) => {
    const recipeWithName = await Recipe.findOne({ name: data.recipeName });
    if (recipeWithName) {
        throw new Error('Recipe with given name already exists!');
    }

    const category = await getById(data.recipeCategory);
    if (!category) {
        throw new Error('Category does not exist!');
    }

    if (data.youtubeLink) {
        const regex = new RegExp(/^(https?:\/\/)?(www\.)?youtube\.com\/embed\/([\w-]+)(\S+)?$/);

        if (regex.test(data.youtubeLink) == false) {
            throw new Error('Invalid embedded youtube link format!');
        }
    }

    if (!data.ingredients) {
        throw new Error('Recipe Ingredients list is empty!');
    }

    if (data.ingredients.length < 2 || data.ingredients.length > 30) {
        throw new Error('Recipe ingredients must be between 2 and 30!');
    }

    if (data.ingredients.some(x => x.length < 5 || x.length > 100)) {
        throw new Error('Recipe ingredient must be between 5 and 100 characters long!');
    }

    if (!data.steps) {
        throw new Error('Recipe Steps list is empty!');
    }

    if (data.steps.length < 2 || data.steps.length > 30) {
        throw new Error('Recipe steps must be between 2 and 30!');
    }

    if (data.steps.some(x => x.length < 5 || x.length > 200)) {
        throw new Error('Recipe step must be between 5 and 200 characters long!');
    }
};