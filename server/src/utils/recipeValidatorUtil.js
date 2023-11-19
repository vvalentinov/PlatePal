const Recipe = require('../models/Recipe');

const categoryManager = require('../managers/categoryManager');

const recipeErrors = require('../constants/errorMessages/recipeErrors');
const categoryErrors = require('../constants/errorMessages/categoryErrors');
const regexes = require('../constants/regexes/regexes');

exports.recipeValidator = async (data) => {
    const recipe = await Recipe.findOne({ name: data.recipeName });
    if (recipe) {
        throw new Error(recipeErrors.recipeWithNameExistError);
    }

    const regex = new RegExp(regexes.recipeNameRegex);
    if (!regex.test(data.recipeCategory)) {
        throw new Error(categoryErrors.categoryInvalidIdFormat);
    }

    const category = await categoryManager.getById(data.recipeCategory);
    if (!category) {
        throw new Error(categoryErrors.categoryInvalidError);
    }

    if (data.youtubeLink) {
        const regex = new RegExp(regexes.recipeYoutubeLinkRegex);

        if (regex.test(data.youtubeLink) == false) {
            throw new Error(recipeErrors.recipeYoutubeLinkFormatError);
        }
    }

    if (!data.ingredients) {
        throw new Error(recipeErrors.recipeIngredientsRequiredError);
    }

    if (data.ingredients.length < 2 || data.ingredients.length > 30) {
        throw new Error(recipeErrors.recipeIngredientsCountError(2, 30));
    }

    if (data.ingredients.some(x => x.length < 2 || x.length > 100)) {
        throw new Error(recipeErrors.recipeIngredientLengthError(2, 100));
    }

    if (!data.steps) {
        throw new Error(recipeErrors.recipeStepsRequiredError);
    }

    if (data.steps.length < 2 || data.steps.length > 30) {
        throw new Error(recipeErrors.recipeStepsCountError(2, 30));
    }

    if (data.steps.some(x => x.length < 5 || x.length > 200)) {
        throw new Error(recipeErrors.recipeStepLengthError(5, 200));
    }
};