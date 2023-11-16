const mongoose = require('mongoose');

const {
    CommentModelName,
    RecipeModelName,
    UserModelName
} = require('../constants/dbModelsNames');

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    recipeId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: RecipeModelName,
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: UserModelName,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    userLikes: [{
        type: mongoose.Types.ObjectId,
        ref: UserModelName,
    }],
    likesCount: {
        type: Number,
        default: 0
    }
});

const Comment = mongoose.model(CommentModelName, commentSchema);

module.exports = Comment;