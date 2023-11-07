const router = require('express').Router();

const { isAuthenticated } = require('../middlewares/authMiddleware');

const { createCommentRoute } = require('../constants/routeNames/commentRoutes');

const { getErrorMessage } = require('../utils/errorMessageUtil');

const commentManager = require('../managers/commentManager');

router.post(
    createCommentRoute,
    isAuthenticated,
    async (req, res) => {
        const commentData = req.body;
        const userId = req.user._id;
        try {
            const result = await commentManager.create(commentData, userId);
            res.status(200).json({ message: 'Comment created successfully!', result });
        } catch (error) {
            res.status(400).json({ message: getErrorMessage(error) });
        }
    });

module.exports = router;