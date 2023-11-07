const Comment = require('../models/Comment');

exports.create = async (commentData, user) => {
    const result = await Comment.create({
        text: commentData.text,
        recipeId: commentData.recipeId,
        user
    });

    return result;
};

exports.getRecipeComments = (recipeId) => Comment.find({ recipeId });