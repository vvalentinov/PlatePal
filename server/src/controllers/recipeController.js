const router = require('express').Router();

const multer = require('multer');

const { isAuthenticated } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/isAdminMiddleware');

const {
    createRecipeRoute,
    getRecipesInCategoryRoute,
    getRecipeDetailsRoute,
} = require('../constants/routeNames/recipeRoutes');

const recipeManager = require('../managers/recipeManager');

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
            const result = await recipeManager.create(data, image, owner);
            res.status(200).json({ message: "Recipe created successfully!", result });
        } catch (error) {
            res.status(400).json({ message: getErrorMessage(error) });
        }
    });

router.get(getRecipesInCategoryRoute, async (req, res) => {
    const category = req.params.categoryName;
    try {
        const result = await recipeManager.getAll(category);
        res.status(200).json({ message: "Recipes retrieved successfully!", result });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

router.get(getRecipeDetailsRoute, async (req, res) => {
    const recipeId = req.params.recipeId;
    const userId = req.user?._id;
    try {
        const recipe = await recipeManager.getPopulatedRecipe(recipeId, userId);
        res.status(200).json({ message: "Recipe with given id found!", result: recipe });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

router.get('/all/unapproved', isAdmin, async (req, res) => {
    const recipes = await recipeManager.genUnapproved();
    res.status(200).json({ message: "Unapproved recipes retrieved!", result: recipes });
});

module.exports = router;