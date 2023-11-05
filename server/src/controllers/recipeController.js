const router = require('express').Router();

const multer = require('multer');

const { isAuthenticated } = require('../middlewares/authMiddleware');

const {
    createRecipeRoute,
    getRecipesInCategory,
    getRecipeRoute,
} = require('../constants/routeNames/recipeRoutes');

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

router.get(getRecipesInCategory, async (req, res) => {
    const category = req.params.categoryName;
    try {
        const result = await recipeService.getAll(category);
        res.status(200).json({ message: "Recipes retrieved successfully!", result });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

router.get(getRecipeRoute, async (req, res) => {
    const recipeId = req.params.recipeId;
    const recipe = await recipeService.getById(recipeId).populate('owner', 'username');
    if (!recipe) {
        res.status(400).json({ message: 'No recipe found with given id!' });
    }

    res.status(200).json({ message: "Recipe with given id found!", result: recipe });
});

module.exports = router;