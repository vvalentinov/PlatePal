const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    recipeId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Recipe',
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;