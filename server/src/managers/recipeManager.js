const Recipe = require('../models/Recipe');

const userManager = require('./userManager');
const ratingManager = require('./ratingManager');
const commentManager = require('./commentManager');
const categoryManager = require('./categoryManager');

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

    const recipe = await Recipe.create({ ...data, owner });

    const { public_id, secure_url } = await uploadImage(recipeImage.buffer, 'Recipes');
    recipe.image.publicId = public_id;
    recipe.image.url = secure_url;

    await recipe.save();
    return recipe;
};

exports.edit = async (recipeId, data, recipeImage, owner) => {
    await checkIfRecipeExists(recipeId);
    await recipeValidator(data);

    const recipe = await Recipe.findById(recipeId);

    if (recipe.owner.toString() !== owner) {
        throw new Error(recipeErrors.recipeOwnerEditError);
    }

    const editedRecipe = await Recipe.findByIdAndUpdate(
        recipeId,
        { ...data, owner },
        { new: true }
    );

    if (recipeImage) {
        validateImageFile(recipeImage);
        await deleteImage(recipe.image.publicId);

        const { public_id, secure_url } = await uploadImage(recipeImage.buffer, 'Recipes');
        editedRecipe.image.publicId = public_id;
        editedRecipe.image.url = secure_url;
    }

    await editedRecipe.save();
    return editedRecipe;
};

exports.getAll = async (
    categoryName,
    pageNumber,
    searchName,
    sortCriteria
) => {
    if (pageNumber < 1) {
        throw new Error('Page number must be bigger or equal to 1!');
    }

    if (sortCriteria !== 'ByAvgScoreDesc' &&
        sortCriteria !== 'ByDateAsc' &&
        sortCriteria !== 'ByDateDesc') {

    }

    let sortArg;
    switch (sortCriteria) {
        case 'ByAvgScoreDesc':
            sortArg = { 'averageRating': -1, 'createdAt': -1 };
            break;
        case 'ByDateDesc':
            sortArg = { 'createdAt': -1 };
            break;
        case 'ByDateAsc':
            sortArg = { 'createdAt': 1 };
            break;
        default:
            throw new Error('Invalid sort criteria!');
    }

    const category = await categoryManager.getByName(categoryName);
    if (!category) {
        throw new Error(categoryErrors.categoryInvalidError);
    }

    const totalRecipesInCategory = await Recipe.countDocuments(
        {
            category: category._id,
            isApproved: true
        });

    const total = await Recipe.countDocuments
        ({
            category: category._id,
            isApproved: true,
            name: new RegExp(searchName, 'i')
        });

    const totalPages = Math.ceil(total / 6);

    const recipes = await Recipe.find
        ({
            category: category._id,
            isApproved: true,
            name: new RegExp(searchName, 'i')
        })
        .limit(6)
        .skip((6 * pageNumber) - 6)
        .sort(sortArg)
        .select('_id image name')
        .lean();

    return { recipes, totalPages, totalRecipesInCategory };
};

exports.getUnapproved = async (pageNumber, searchName) => {
    if (pageNumber < 1) {
        throw new Error('Page number must be bigger or equal to 1!');
    }

    const total = await Recipe.countDocuments
        ({
            isApproved: false,
            name: new RegExp(searchName, 'i')
        });

    const totalPages = Math.ceil(total / 6);

    const recipes = await Recipe.find
        ({
            isApproved: false,
            name: new RegExp(searchName, 'i')
        })
        .limit(6)
        .skip((6 * pageNumber) - 6)
        .select('_id image name')
        .lean();

    return { recipes, totalPages };
}

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

    const user = await userManager.getById(userId);
    if (user) {
        const isFavourite = user.favouriteRecipes.includes(recipeId);
        populatedRecipe = { ...populatedRecipe, isFavourite };
    }

    populatedRecipe.averageRating = populatedRecipe.averageRating.toFixed(1);

    if (userId) {
        const rating = await ratingManager.getRating(userId, recipeId);
        populatedRecipe = { ...populatedRecipe, userRating: rating };
    }

    return populatedRecipe;
};

exports.approveRecipe = async (recipeId) => {
    const recipe = await this.getById(recipeId);

    recipe.isApproved = true;
    await recipe.save();

    return recipe;
};

exports.getUserRecipes = async (
    userId,
    searchName,
    pageNumber,
    recipeType
) => {
    const user = await userManager.getById(userId);
    if (!user) {
        throw new Error('No user with given id found!');
    }

    let query = { owner: userId, name: new RegExp(searchName, 'i') };

    if (recipeType === 'approved') {
        query.isApproved = true;
    } else if (recipeType === 'unapproved') {
        query.isApproved = false;
    }

    const total = await Recipe.countDocuments(query);
    const totalPages = Math.ceil(total / 6);

    const recipes = await Recipe.find(query)
        .limit(6)
        .skip((6 * pageNumber) - 6)
        .select('_id image name')
        .lean();

    return { recipes, totalPages };
};

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

exports.deleteAllRecipesInCategory = async (categoryId) => {
    const recipes = await Recipe.find({ category: categoryId });

    recipes.forEach(async recipe => {
        await commentManager.deleteRecipeComments(recipe._id);
        await ratingManager.deleteRecipeRatings(recipe._id);
        await deleteImage(recipe.image.publicId);
    });

    await Recipe.deleteMany({ category: categoryId });
};

exports.deleteAllUserRecipes = async (userId) => {
    const recipes = await Recipe.find({ owner: userId });

    recipes.forEach(async recipe => {
        await commentManager.deleteRecipeComments(recipe._id);
        await ratingManager.deleteRecipeRatings(recipe._id);
        await deleteImage(recipe.image.publicId);
    });

    await Recipe.deleteMany({ owner: userId });
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

exports.getMostRecentRecipes = async () =>
    await Recipe.find({ isApproved: true })
        .sort({ 'createdAt': -1 })
        .limit(6)
        .select('_id image name')
        .lean();

exports.getTopRatedRecipes = async () =>
    await Recipe.find({ isApproved: true })
        .sort({ 'averageRating': -1, 'createdAt': -1 })
        .limit(6)
        .select('_id image name')
        .lean();

