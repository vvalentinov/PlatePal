const Comment = require('../models/Comment');

exports.create = async (commentData, userId) => {
    const result = await Comment.create({
        text: commentData.text,
        recipeId: commentData.recipeId,
        userId
    });

    return result;
};