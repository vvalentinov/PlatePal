const router = require('express').Router();

const multer = require('multer');

const { isAuthenticated } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/isAdminMiddleware');
const { isRecipeNameCorrectFormat } = require('../middlewares/recipeNameMiddleware');

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

router.get('/unapproved', isAdmin, async (req, res) => {
    const recipes = await recipeManager.genUnapproved();
    res.status(200).json({ message: "Unapproved recipes retrieved!", result: recipes });
});

router.put('/approve/:recipeId', isAdmin, async (req, res) => {
    const recipeId = req.params.recipeId;
    const recipe = await recipeManager.approveRecipe(recipeId);
    res.status(200).json({ message: "Recipe approved successfully!", result: recipe });
});

router.get(
    '/user-recipes',
    isAuthenticated,
    isRecipeNameCorrectFormat,
    async (req, res) => {
        const userId = req.user._id;
        const searchName = req.query.searchName;
        const recipes = await recipeManager.getUserRecipes(userId, searchName);
        res.status(200).json({ message: "User recipes retrieved successfully!", result: recipes });
    });

router.get(
    '/user-recipes/approved',
    isAuthenticated,
    isRecipeNameCorrectFormat,
    async (req, res) => {
        const userId = req.user._id;
        const searchName = req.query.searchName;
        const recipes = await recipeManager.getUserApprovedRecipes(userId, searchName);
        res.status(200).json({ message: "User approved recipes retrieved successfully!", result: recipes });
    });

router.get(
    '/user-recipes/unapproved',
    isAuthenticated,
    isRecipeNameCorrectFormat,
    async (req, res) => {
        const userId = req.user._id;
        const searchName = req.query.searchName;
        const recipes = await recipeManager.getUserUnapprovedRecipes(userId, searchName);
        res.status(200).json({ message: "User unapproved recipes retrieved successfully!", result: recipes });
    });

router.delete('/delete/:recipeId', isAuthenticated, async (req, res) => {
    const recipeId = req.params.recipeId;
    const userId = req.user._id;

    try {
        const result = await recipeManager.deleteRecipe(userId, recipeId);
        res.status(200).json({ message: 'Recipe deleted successfully!', result });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

module.exports = router;