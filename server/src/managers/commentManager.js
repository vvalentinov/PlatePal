const Comment = require('../models/Comment');

const userManager = require('./userManager');

const { checkIfRecipeExists } = require('../utils/checkIfRecipeExistsUtil');

exports.create = async (commentData, userId) => {
    await checkIfRecipeExists(commentData.recipeId);

    const regex = new RegExp(/^[0-9a-fA-F]{24}$/);
    if (!regex.test(userId)) {
        throw new Error('Invalid user id format!');
    }

    const user = await userManager.getById(userId);
    if (!user) {
        throw new Error('No user with given id found!');
    }

    const comment = await Comment.create({
        text: commentData.text,
        recipeId: commentData.recipeId,
        user: userId
    });

    return comment.populate('user', 'username');
};

exports.editComment = async (commentId, userId, recipeId, newText) => {
    const comment = await Comment.findOne({ _id: commentId, recipeId });
    if (!comment) {
        throw new Error('No comment of recipe found with given id!');
    }

    const user = await userManager.getById(userId);
    if (!user) {
        throw new Error('No user with given id found!');
    }

    if (comment.user._id.toString() !== userId && !user.isAdmin) {
        throw new Error('You have to be either an admin or the comment owner to edit it!');
    }

    comment.text = newText;
    await comment.save();

    return comment.populate('user', 'username');
};

exports.deleteComment = async (commentId, userId) => {
    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new Error('Comment with given id not found!');
    }

    const user = await userManager.getById(userId);
    if (!user) {
        throw new Error('No user with given id found!');
    }

    if (comment.user._id.toString() !== userId && !user.isAdmin) {
        throw new Error('You have to be either an admin or the comment owner to delete it!');
    }

    await Comment.deleteOne({ _id: commentId });

    return comment;
};

exports.deleteRecipeComments = async (recipeId) => {
    await checkIfRecipeExists(recipeId);
    await Comment.deleteMany({ recipeId });
};

exports.likeComment = async (commentId, userId) => {
    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new Error('Comment with given id not found!');
    }

    const user = await userManager.getById(userId);
    if (!user) {
        throw new Error('User with given id not found!');
    }

    let message = 'Comment liked successfully!';

    if (comment.userLikes.includes(userId)) {
        comment.userLikes = comment.userLikes.filter(x => x._id.toString() !== userId);
        message = 'Comment unliked successfully!';
    } else {
        comment.userLikes.push(user._id);
    }

    comment.likesCount = comment.userLikes.length;

    await comment.save();

    const result = await comment.populate('user', 'username');

    return { message, result };
};

exports.getComments = async (userId, recipeId, type) => {
    await checkIfRecipeExists(recipeId);

    switch (type) {
        case 'ByDateDesc':
            return await Comment.find({ recipeId })
                .populate('user', 'username')
                .sort({ 'createdAt': -1 })
                .lean();
        case 'ByDateAsc':
            return await Comment.find({ recipeId })
                .populate('user', 'username')
                .sort({ 'createdAt': 1 })
                .lean();
        case 'ByLikesDesc':
            return await Comment.find({ recipeId })
                .populate('user', 'username')
                .sort({ 'likesCount': -1, 'createdAt': -1 })
                .lean();
        case 'UserComments':
            const user = await userManager.getById(userId);
            if (!user) {
                throw new Error('No user with given id found!');
            }

            return await Comment.find({ recipeId, user: userId })
                .populate('user', 'username')
                .sort({ 'createdAt': -1 })
                .lean();
        default: throw new Error('Invalid comment type!');
    }
};

exports.deleteAllUserComments = async (userId) => Comment.deleteMany({ user: userId });