const router = require('express').Router();

const { isAuthenticated } = require('../middlewares/authMiddleware');

const { getErrorMessage } = require('../utils/errorMessageUtil');

const {
    loginRoute,
    registerRoute,
    logoutRoute,
} = require('../constants/routeNames/userRoutes');

const userManager = require('../managers/userManager');

router.post(loginRoute, async (req, res) => {
    const { username, password } = req.body;
    try {
        const session = await userManager.login(username, password);
        res.status(200).json(session);
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

router.post(registerRoute, async (req, res) => {
    const userData = req.body;
    try {
        const session = await userManager.register(userData);
        res.status(201).json(session);
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

router.get(logoutRoute, isAuthenticated, async (req, res) => {
    userManager.logout(req.user.token);
    res.status(200).json({ message: "Logged out successfully!" });
});

router.put('/add-recipe-to-favourites/:recipeId', isAuthenticated, async (req, res) => {
    const recipeId = req.params.recipeId;
    const userId = req.user._id;

    try {
        const result = await userManager.addRecipeToFavourites(userId, recipeId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

module.exports = router;