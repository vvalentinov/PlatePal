const Recipe = require('../models/Recipe');

const { mongooseObjectIdFormatRegex } = require('../constants/regexes/regexes');

const { recipeInvalidIdFormat, recipeNotFoundWithId } = require('../constants/errorMessages/recipeErrors');

exports.checkIfRecipeExists = async (recipeId) => {
    const regex = new RegExp(mongooseObjectIdFormatRegex);
    if (!regex.test(recipeId)) {
        throw new Error(recipeInvalidIdFormat);
    }

    const recipeExists = await Recipe.exists({ _id: recipeId });
    if (!recipeExists) {
        throw new Error(recipeNotFoundWithId);
    }
};