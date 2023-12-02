const StarRating = require('../models/StarRating');

const { calcAvgRating } = require('../utils/calcRecipeAvgRatingUtil');

const recipeManager = require('../managers/recipeManager');

exports.rateRecipe = async (recipeId, userId, value) => {
    const recipe = await recipeManager.getById(recipeId);
    if (!recipe) {
        throw new Error('No recipe found with given id!');
    }

    const existingRating = await StarRating.findOne({ userId, recipeId });
    if (existingRating) {
        existingRating.value = value;
        await existingRating.save();
    } else {
        const newRating = new StarRating({ value, userId, recipeId });
        await newRating.save();

        recipe.ratings.push(newRating._id);
    }

    const averageRating = (await calcAvgRating(recipe)).toFixed(1);
    recipe.averageRating = averageRating;
    await recipe.save();


    return { averageRating, rateValue: value, ratings: recipe.ratings };
};

exports.getRating = async (userId, recipeId) => {
    const rating = await StarRating.findOne({ userId, recipeId });
    if (!rating) {
        return 0;
    }

    return rating.value;
};

exports.deleteRecipeRatings = async (recipeId) => await StarRating.deleteMany({ recipeId });

exports.deleteUserRatings = async (userId) => await StarRating.deleteMany({ userId });
