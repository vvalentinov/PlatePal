const Comment = require('../models/Comment');

const { getById } = require('./recipeManager');

exports.create = async (commentData, userId) => {
    const comment = await Comment.create({
        text: commentData.text,
        recipeId: commentData.recipeId,
        user: userId,
    });

    const recipe = await getById(commentData.recipeId);
    recipe.comments.push(comment._id);
    await recipe.save();

    return comment;
};

exports.getRecipeComments = (recipeId) => Comment.find({ recipeId });