const Recipe = require('../models/Recipe');

const { getById } = require('../services/categoryService');

const { uploadImage } = require('../utils/cloudinaryUtil');

const path = require('path');

exports.create = async (data, recipeImage, owner) => {
    const recipeWithName = await Recipe.findOne({ name: data.recipeName });
    if (recipeWithName) {
        throw new Error('Recipe with given name already exists!');
    }

    const category = await getById(data.recipeCategory);
    if (!category) {
        throw new Error('Category does not exist!');
    }

    const imageExt = path.extname(recipeImage.originalname);
    if (imageExt != '.png' &&
        imageExt != '.jpg' &&
        imageExt != '.jpeg') {
        throw new Error('Image file must be in format: .png, .jpg or .jpeg!');
    }

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