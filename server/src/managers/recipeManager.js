const Recipe = require('../models/Recipe');

const { getByName } = require('./categoryManager');
const { getRating } = require('./ratingManager');

const { uploadImage } = require('../utils/cloudinaryUtil');
const { validateImageFile } = require('../utils/imageFileValidatiorUtil');
const { recipeValidator } = require('../utils/recipeValidatorUtil');
const { checkIfRecipeExists } = require('../utils/checkIfRecipeExistsUtil');

exports.getById = async (recipeId) => {
    await checkIfRecipeExists(recipeId);
    return Recipe.findById(recipeId);
};

exports.getPopulatedRecipe = async (recipeId, userId) => {
    await checkIfRecipeExists(recipeId);

    let populatedRecipe = await Recipe.findById(recipeId)
        .populate('owner', 'username')
        .populate('category', 'name')
        .populate({
            path: 'comments',
            populate: {
                path: 'user',
                model: 'User',
                select: 'username'
            },
        }).lean();

    if (userId) {
        const rating = await getRating(userId, recipeId);
        populatedRecipe = { ...populatedRecipe, userRating: rating };
    }

    return populatedRecipe;
};

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

    const recipes = await Recipe.find
        ({
            category: category._id,
            isApproved: true
        })
        .select('_id image name')
        .lean();

    return recipes;
};

exports.genUnapproved = () => Recipe.find({ isApproved: false }).lean();

exports.approveRecipe = (recipeId) => Recipe.findByIdAndUpdate(
    recipeId,
    { isApproved: true },
    { new: true });

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

exports.getUserRecipes = (userId, searchName) => Recipe.find(
    {
        owner: userId,
        name: new RegExp(escapeRegExp(searchName), 'i'),
    }
).select('_id image name');


exports.getUserApprovedRecipes = (userId, searchName) => Recipe.find(
    {
        owner: userId,
        isApproved: true,
        name: new RegExp(escapeRegExp(searchName), 'i'),
    }
).select('_id image name');

exports.getUserUnapprovedRecipes = (userId, searchName) => Recipe.find(
    {
        owner: userId,
        isApproved: false,
        name: new RegExp(escapeRegExp(searchName), 'i'),
    }
).select('_id image name');
