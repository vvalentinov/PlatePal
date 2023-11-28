const mongoose = require('mongoose');

const modelNames = require('../constants/dbModelsNames');

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minLength: [4, 'Comment must be between 4 and 540 characters long!'],
        maxLength: [540, 'Comment must be between 4 and 540 characters long!']
    },
    recipeId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: modelNames.RecipeModelName,
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: modelNames.UserModelName,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    userLikes: [{
        type: mongoose.Types.ObjectId,
        ref: modelNames.UserModelName,
    }],
    likesCount: {
        type: Number,
        default: 0
    }
});

const Comment = mongoose.model(modelNames.CommentModelName, commentSchema);

module.exports = Comment;