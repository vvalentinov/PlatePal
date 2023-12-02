const router = require('express').Router();

const { isAuthenticated } = require('../middlewares/authMiddleware');

const {
    createCommentRoute,
    editCommentRoute,
    deleteCommentRoute,
    likeCommentRoute,
    getCommentsByDateDescRoute,
    getCommentsByDateAscRoute,
    getCommentsByLikesDescRoute,
    getUserCommentsRoute
} = require('../constants/routeNames/commentRoutes');

const { getErrorMessage } = require('../utils/errorMessageUtil');

const commentManager = require('../managers/commentManager');

router.post(
    createCommentRoute,
    isAuthenticated,
    async (req, res) => {
        const commentData = req.body;
        const user = req.user._id;
        try {
            const result = await commentManager.create(commentData, user);
            res.status(200).json({ message: 'Comment created successfully!', result });
        } catch (error) {
            res.status(400).json({ message: getErrorMessage(error) });
        }
    });

router.put(editCommentRoute, isAuthenticated, async (req, res) => {
    const commentId = req.params.commentId;
    const userId = req.user._id;
    const { recipeId, text } = req.body;

    try {
        const result = await commentManager.editComment(commentId, userId, recipeId, text);
        res.status(200).json({ message: 'Comment edited successfully!', result });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

router.delete(deleteCommentRoute, isAuthenticated, async (req, res) => {
    const commentId = req.params.commentId;

    try {
        const result = await commentManager.deleteComment(commentId);
        res.status(200).json({ message: 'Comment deleted successfully!', result });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

router.put(likeCommentRoute, isAuthenticated, async (req, res) => {
    const commentId = req.params.commentId;
    const userId = req.user._id;

    try {
        const result = await commentManager.likeComment(commentId, userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

router.get(getCommentsByDateDescRoute, async (req, res) => {
    const recipeId = req.params.recipeId;
    try {
        const result = await commentManager.getCommentsByDateDesc(recipeId);
        res.status(200).json({ message: 'Recipe comments retrieved successfully!', result });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

router.get(getCommentsByDateAscRoute, async (req, res) => {
    const recipeId = req.params.recipeId;

    try {
        const result = await commentManager.getCommentsByDateAsc(recipeId);
        res.status(200).json({ message: 'Sorted comments by date asc!', result });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

router.get(getCommentsByLikesDescRoute, async (req, res) => {
    const recipeId = req.params.recipeId;
    try {
        const result = await commentManager.getCommentsByLikesDesc(recipeId);
        res.status(200).json({ message: 'Sorted comments', result });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

router.get(getUserCommentsRoute, isAuthenticated, async (req, res) => {
    const userId = req.user._id;
    const recipeId = req.params.recipeId;
    try {
        const result = await commentManager.getUserComments(userId, recipeId);
        res.status(200).json({ message: 'User comments retrieved successfully!', result });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

module.exports = router;