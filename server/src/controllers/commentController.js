const router = require('express').Router();

const { isAuthenticated } = require('../middlewares/authMiddleware');

const { createCommentRoute } = require('../constants/routeNames/commentRoutes');

router.post(
    createCommentRoute,
    isAuthenticated,
    async (req, res) => {

    });

module.exports = router;