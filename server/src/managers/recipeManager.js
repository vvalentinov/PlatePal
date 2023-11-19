const Recipe = require('../models/Recipe');

const { getByName } = require('./categoryManager');
const { getRating } = require('./ratingManager');
const { getById } = require('./userManager');

const { uploadImage } = require('../utils/cloudinaryUtil');
const { validateImageFile } = require('../utils/imageFileValidatiorUtil');
const { recipeValidator } = require('../utils/recipeValidatorUtil');
const { checkIfRecipeExists } = require('../utils/checkIfRecipeExistsUtil');
const { deleteImage } = require('../utils/cloudinaryUtil');

exports.getById = async (recipeId) => {
    await checkIfRecipeExists(recipeId);
    return Recipe.findById(recipeId);
};

exports.getPopulatedRecipe = async (recipeId, userId) => {
    await checkIfRecipeExists(recipeId);

    let populatedRecipe = await Recipe.findById(recipeId)
        .populate('owner', 'username')
        .populate('category', 'name')
        .lean();

    populatedRecipe.averageRating = populatedRecipe.averageRating.toFixed(1);

    if (userId) {
        const rating = await getRating(userId, recipeId);
        populatedRecipe = { ...populatedRecipe, userRating: rating };
    }

    return populatedRecipe;
};

exports.create = async (data, recipeImage, owner) => {
    await recipeValidator(data);

    validateImageFile(recipeImage);

    const recipe = await Recipe.create({
        name: data.recipeName,
        description: data.recipeDescription,
        cookingTime: data.recipeCookingTime,
        prepTime: data.recipePrepTime,
        servings: data.recipeServings,
        ingredients: data.ingredients,
        steps: data.steps,
        youtubeLink: data.youtubeLink,
        category: data.recipeCategory,
        owner,
    });

    const { public_id, secure_url } = await uploadImage(recipeImage.buffer, 'Recipes');
    recipe.image.publicId = public_id;
    recipe.image.url = secure_url;

    await recipe.save();

    return recipe;
};

exports.getAll = async (categoryName) => {
    const category = await getByName(categoryName);
    if (!category) {
        throw new Error('Invalid recipe category!');
    }

    const recipes = await Recipe.find({ category: category._id, isApproved: true })
        .select('_id image name')
        .lean();

    return recipes;
};

exports.getUnapproved = () => Recipe.find({ isApproved: false }).lean();

exports.approveRecipe = (recipeId) => Recipe.findByIdAndUpdate(
    recipeId,
    { isApproved: true },
    { new: true });

exports.getUserRecipes = (userId, searchName) => Recipe.find(
    {
        owner: userId,
        name: new RegExp(searchName, 'i'),
    }
).select('_id image name');


exports.getUserApprovedRecipes = (userId, searchName) => Recipe.find(
    {
        owner: userId,
        isApproved: true,
        name: new RegExp(searchName, 'i'),
    }
).select('_id image name');

exports.getUserUnapprovedRecipes = (userId, searchName) => Recipe.find(
    {
        owner: userId,
        isApproved: false,
        name: new RegExp(searchName, 'i'),
    }
).select('_id image name');

exports.deleteRecipe = async (userId, recipeId) => {
    await checkIfRecipeExists(recipeId);

    const recipe = await Recipe.findById(recipeId);

    const user = await getById(userId);
    if (!user) {
        throw new Error('User with given id doesn\'t exist!');
    }

    if (!user.isAdmin && (recipe.owner._id).toString() !== userId) {
        throw new Error('You have to be either the recipe owner or an admin to delete this recipe!');
    }

    await deleteImage(recipe.image.publicId);

    const deletedRecipe = await Recipe.findOneAndDelete({ _id: recipeId });

    return deletedRecipe;
};
