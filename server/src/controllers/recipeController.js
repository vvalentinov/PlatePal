const router = require('express').Router();

const multer = require('multer');

const { isAuthenticated } = require('../middlewares/authMiddleware');

const { createRecipeRoute } = require('../constants/routeNames/recipeRoutes');

const recipeService = require('../services/recipeService');

router.post(
    createRecipeRoute,
    isAuthenticated,
    multer().single('recipeFile'),
    async (req, res) => {
        const image = req.file;
        const data = { ...req.body };
        try {
            await recipeService.create(data, image);
            res.status(200).json({ message: "Recipe created successfully!" });
        } catch (error) {
            res.status(400).json({ message: getErrorMessage(error) });
        }
    });

module.exports = router;