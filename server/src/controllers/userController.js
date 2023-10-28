const router = require('express').Router();

const { isAuthenticated } = require('../middlewares/authMiddleware');

const {
    loginRoute,
    registerRoute,
    logoutRoute,
} = require('../constants/routeNames/userRoutes');

const userService = require('../services/userService');

router.post(loginRoute, async (req, res) => {
    const { username, password } = req.body;
    try {
        const session = await userService.login(username, password);
        res.status(200).json(session);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post(registerRoute, async (req, res) => {
    const userData = req.body;
    try {
        const session = await userService.register(userData);
        res.status(201).json(session);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get(logoutRoute, isAuthenticated, async (req, res) => {
    userService.logout(req.user.token);
    res.status(200).json({ message: "Logged out successfully!" });
});

module.exports = router;