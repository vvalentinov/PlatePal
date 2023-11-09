const Recipe = require('../models/Recipe');

// const StarRating = require('../models/StarRating');

const { getByName } = require('./categoryManager');

const { uploadImage } = require('../utils/cloudinaryUtil');
const { validateImageFile } = require('../utils/imageFileValidatiorUtil');
const { recipeValidator } = require('../utils/recipeValidatorUtil');
// const { calcAvgRating } = require('../utils/calcRecipeAvgRatingUtil');

exports.getById = (recipeId) => Recipe.findById(recipeId);

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

// exports.rateRecipe = async (recipeId, userId, rateValue) => {
//     const recipe = await Recipe.findById(recipeId);

//     const existingRating = await StarRating.findOne({ userId, recipeId });
//     if (existingRating) {
//         existingRating.value = rateValue;
//         await existingRating.save();
//     } else {
//         const newRating = new StarRating({
//             value: rateValue,
//             userId: userId,
//             recipeId: recipeId,
//         });

//         await newRating.save();
//         recipe.ratings.push(newRating._id);
//     }

//     const averageRating = await calcAvgRating(recipe);
//     recipe.averageRating = averageRating;
//     await recipe.save();

//     return { averageRating, rateValue };
// };