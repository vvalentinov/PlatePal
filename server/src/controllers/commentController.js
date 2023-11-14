const router = require('express').Router();

const { isAuthenticated } = require('../middlewares/authMiddleware');

const {
    createCommentRoute,
    getRecipeCommentsRoute
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

router.get(getRecipeCommentsRoute, async (req, res) => {
    const recipeId = req.params.recipeId;
    try {
        const result = await commentManager.getRecipeComments(recipeId)
            .populate('user', 'username')
            .lean();
        res.status(200).json({ message: 'Recipe comments retrieved successfully!', result });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

router.put('/edit/:commentId', isAuthenticated, async (req, res) => {
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

router.delete('/delete/:commentId', isAuthenticated, async (req, res) => {
    const commentId = req.params.commentId;

    try {
        const result = await commentManager.deleteComment(commentId);
        res.status(200).json({ message: 'Comment deleted successfully!', result });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

router.put('/like/:commentId', isAuthenticated, async (req, res) => {
    const commentId = req.params.commentId;
    const userId = req.user._id;

    try {
        const result = await commentManager.likeComment(commentId, userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

module.exports = router;