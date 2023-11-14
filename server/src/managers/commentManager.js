const Comment = require('../models/Comment');

const { getById } = require('./recipeManager');

exports.create = async (commentData, userId) => {
    const comment = await Comment.create({
        text: commentData.text,
        recipeId: commentData.recipeId,
        user: userId,
        createdAt: commentData.createdAt
    });

    const recipe = await getById(commentData.recipeId);
    recipe.comments.push(comment._id);
    await recipe.save();

    return comment.populate('user', 'username');
};

exports.getRecipeComments = (recipeId) => Comment.find({ recipeId });

exports.editComment = async (commentId, userId, recipeId, newText) => {
    const comment = await Comment.findOne({ _id: commentId, recipeId });
    if (!comment) {
        throw new Error('No comment of recipe found with given id!');
    }

    comment.text = newText;
    await comment.save();

    return comment.populate('user', 'username');
};

exports.deleteComment = async (commentId) => {
    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new Error('Comment with given id not found!');
    }

    await Comment.deleteOne({ _id: commentId });

    return comment;
};