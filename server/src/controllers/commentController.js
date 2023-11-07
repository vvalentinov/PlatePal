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

module.exports = router;