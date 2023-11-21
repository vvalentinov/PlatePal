const Recipe = require('../models/Recipe');

const categoryManager = require('./categoryManager');
const ratingManager = require('./ratingManager');
const userManager = require('./userManager');

const { uploadImage } = require('../utils/cloudinaryUtil');
const { validateImageFile } = require('../utils/imageFileValidatiorUtil');
const { recipeValidator } = require('../utils/recipeValidatorUtil');
const { checkIfRecipeExists } = require('../utils/checkIfRecipeExistsUtil');
const { deleteImage } = require('../utils/cloudinaryUtil');

const categoryErrors = require('../constants/errorMessages/categoryErrors');
const recipeErrors = require('../constants/errorMessages/recipeErrors');

exports.create = async (data, recipeImage, owner) => {
    const recipeWithName = await Recipe.findOne({ name: data.recipeName });
    if (recipeWithName) {
        throw new Error(recipeErrors.recipeWithNameExistError);
    }

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

exports.edit = async (recipeId, data, recipeImage, owner) => {
    await checkIfRecipeExists(recipeId);
    await recipeValidator(data);

    const recipe = await Recipe.findByIdAndUpdate(
        recipeId,
        {
            name: data.recipeName,
            description: data.recipeDescription,
            cookingTime: data.recipeCookingTime,
            prepTime: data.recipePrepTime,
            servings: data.recipeServings,
            ingredients: data.ingredients,
            steps: data.steps,
            youtubeLink: data.youtubeLink,
            category: data.recipeCategory,
            owner
        },
        { new: true }
    );

    if (recipeImage) {
        validateImageFile(recipeImage);
        await deleteImage(recipe.image.publicId);

        const { public_id, secure_url } = await uploadImage(recipeImage.buffer, 'Recipes');
        recipe.image.publicId = public_id;
        recipe.image.url = secure_url;

        await recipe.save();
    }


    return recipe;
};

exports.getAll = async (categoryName) => {
    const category = await categoryManager.getByName(categoryName);
    if (!category) {
        throw new Error(categoryErrors.categoryInvalidError);
    }

    const recipes = await Recipe.find({ category: category._id, isApproved: true })
        .select('_id image name')
        .lean();

    return recipes;
};

exports.getById = async (recipeId) => {
    await checkIfRecipeExists(recipeId);
    return Recipe.findById(recipeId);
};

exports.getRecipeDetails = async (recipeId, userId) => {
    await checkIfRecipeExists(recipeId);

    let populatedRecipe = await Recipe.findById(recipeId)
        .populate('owner', 'username')
        .populate('category', 'name')
        .lean();

    populatedRecipe.averageRating = populatedRecipe.averageRating.toFixed(1);

    if (userId) {
        const rating = await ratingManager.getRating(userId, recipeId);
        populatedRecipe = { ...populatedRecipe, userRating: rating };
    }

    return populatedRecipe;
};

exports.getUnapproved = () => Recipe.find({ isApproved: false }).lean();

exports.approveRecipe = async (recipeId) => {
    const recipe = await this.getById(recipeId);

    recipe.isApproved = true;
    await recipe.save();

    return recipe;
};

exports.getUserRecipes = async (userId, searchName) => {
    const user = await userManager.getById(userId);
    if (!user) {
        throw new Error('No user with given id found!');
    }

    const recipes = Recipe.find({
        owner: userId,
        name: new RegExp(searchName, 'i'),
    }).select('_id image name');

    return recipes;
};

exports.getUserApprovedRecipes = async (userId, searchName) => {
    const user = await userManager.getById(userId);
    if (!user) {
        throw new Error('No user with given id found!');
    }

    const recipes = Recipe.find({
        owner: userId,
        isApproved: true,
        name: new RegExp(searchName, 'i')
    }).select('_id image name');

    return recipes;
}

exports.getUserUnapprovedRecipes = async (userId, searchName) => {
    const user = await userManager.getById(userId);
    if (!user) {
        throw new Error('No user with given id found!');
    }

    const recipes = Recipe.find({
        owner: userId,
        isApproved: false,
        name: new RegExp(searchName, 'i')
    }).select('_id image name');

    return recipes;
}

exports.deleteRecipe = async (userId, recipeId) => {
    await checkIfRecipeExists(recipeId);

    const recipe = await Recipe.findById(recipeId);

    const user = await userManager.getById(userId);
    if (!user) {
        throw new Error('User with given id doesn\'t exist!');
    }

    if (!user.isAdmin && (recipe.owner._id).toString() !== userId) {
        throw new Error('You have to be either the recipe owner or an admin to delete this recipe!');
    }

    const deletedRecipe = await Recipe.findOneAndDelete({ _id: recipeId });

    await deleteImage(recipe.image.publicId);

    return deletedRecipe;
};

exports.getEditRecipeDetails = async (recipeId) => {
    await checkIfRecipeExists(recipeId);

    const recipe = await Recipe.findById(recipeId).lean();

    const preselectedCategory = await Recipe.findById(recipeId)
        .populate({ path: 'category', select: '_id name' })
        .select('category')
        .lean();

    const categoryList = (await categoryManager.getCategoryList())
        .filter(x => x.name !== preselectedCategory.category.name);

    return [
        { recipe },
        { categories: categoryList },
        { preselectedCategory }
    ];
};
