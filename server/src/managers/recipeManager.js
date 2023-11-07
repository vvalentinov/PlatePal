const Recipe = require('../models/Recipe');

const { getByName } = require('./categoryManager');

const { uploadImage } = require('../utils/cloudinaryUtil');
const { validateImageFile } = require('../utils/imageFileValidatiorUtil');
const { recipeValidator } = require('../utils/recipeValidatorUtil');

exports.create = async (data, recipeImage, owner) => {
    await recipeValidator(data);

    validateImageFile(recipeImage);

    const { public_id, secure_url } = await uploadImage(recipeImage.buffer, 'Recipes');

    const recipe = await Recipe.create({
        name: data.recipeName,
        description: data.recipeDescription,
        image: { publicId: public_id, url: secure_url },
        cookingTime: data.recipeCookingTime,
        ingredients: data.ingredients,
        steps: data.steps,
        youtubeLink: data.youtubeLink,
        category: data.recipeCategory,
        owner,
    });

    return recipe;
};

exports.getAll = async (categoryName) => {
    const category = await getByName(categoryName);
    if (!category) {
        throw new Error('Invalid recipe category!');
    }

    const recipes = await Recipe.find({ category: category._id }).lean();
    return recipes;
};

exports.getById = (recipeId) => Recipe.findById(recipeId);