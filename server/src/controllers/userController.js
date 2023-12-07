const router = require('express').Router();

const { isAuthenticated, isGuest } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/isAdminMiddleware');

const { getErrorMessage } = require('../utils/errorMessageUtil');

const routes = require('../constants/routeNames/userRoutes');

const userManager = require('../managers/userManager');

router.post(routes.loginRoute, isGuest, async (req, res) => {
    const { username, password } = req.body;

    try {
        const session = await userManager.login(username, password);
        res.status(200).json(session);
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

router.post(routes.registerRoute, isGuest, async (req, res) => {
    const userData = req.body;
    try {
        const session = await userManager.register(userData);
        res.status(201).json(session);
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

router.get(routes.logoutRoute, isAuthenticated, async (req, res) => {
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

router.get('/get-user-favourite-recipes', isAuthenticated, async (req, res) => {
    const userId = req.user._id;

    try {
        const result = await userManager.getUserFavouriteRecipes(userId);
        res.status(200).json({ message: 'User favourite recipes retrieved successfully!', result });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

router.get('/get-all/:userRole', isAdmin, async (req, res) => {
    const userRole = req.params.userRole;

    try {
        const result = await userManager.getAllUsers(userRole);
        res.status(200).json({ message: 'Users retrieved successfully!', result });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

router.put('/change-username', isAuthenticated, async (req, res) => {
    const { _id, token } = req.user;
    const { newUsername } = req.body;

    try {
        const result = await userManager.changeUsername(_id, token, newUsername);
        res.status(200).json({ message: 'Username changed!', result });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

router.put('/change-password', isAuthenticated, async (req, res) => {
    const { _id } = req.user;
    const { oldPassword, newPassword } = req.body;

    try {
        await userManager.changePassword(_id, oldPassword, newPassword);
        res.status(200).json({ message: 'Password changed!' });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

router.put('/change-user-role/:userId', isAdmin, async (req, res) => {
    const userId = req.params.userId;

    try {
        const { updatedUser, session } = await userManager.changeUserRole(userId);
        res.status(200).json({ message: 'User role is now changed!', result: updatedUser, session });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

router.delete('/delete/:userId', isAdmin, async (req, res) => {
    const userId = req.params.userId;

    try {
        const result = await userManager.deleteUser(userId);
        res.status(200).json({ message: 'User deleted successfully!', result });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

router.delete('/delete-my-profile/:userId', isAuthenticated, async (req, res) => {
    const userId = req.params.userId;

    try {
        const result = await userManager.deleteMyProfile(userId, req.user._id);
        res.status(200).json({ message: 'My profile deleted successfully!', result });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

module.exports = router;