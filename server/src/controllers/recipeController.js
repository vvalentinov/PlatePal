const router = require('express').Router();

const multer = require('multer');

const { isAuthenticated } = require('../middlewares/authMiddleware');

const { createRecipeRoute } = require('../constants/routeNames/recipeRoutes');

const recipeService = require('../services/recipeService');

const { getErrorMessage } = require('../utils/errorMessageUtil');

router.post(
    createRecipeRoute,
    isAuthenticated,
    multer().single('recipeFile'),
    async (req, res) => {
        const image = req.file;
        const data = req.body;
        const owner = req.user._id;
        try {
            const result = await recipeService.create(data, image, owner);
            res.status(200).json({ message: "Recipe created successfully!", result });
        } catch (error) {
            res.status(400).json({ message: getErrorMessage(error) });
        }
    });

module.exports = router;