const router = require('express').Router();

const multer = require('multer');

const { isAuthenticated } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/isAdminMiddleware');
const { isRecipeNameCorrectFormat } = require('../middlewares/recipeNameMiddleware');

const routes = require('../constants/routeNames/recipeRoutes');

const recipeManager = require('../managers/recipeManager');

const { getErrorMessage } = require('../utils/errorMessageUtil');

const successMsg = require('../constants/successMessages/recipe');

router.post(
    routes.createRecipeRoute,
    isAuthenticated,
    multer().single('recipeFile'),
    async (req, res) => {
        const image = req.file;
        const data = req.body;
        const owner = req.user._id;

        try {
            const result = await recipeManager.create(data, image, owner);
            res.status(201).json({ message: successMsg.createRecipeSuccess, result });
        } catch (error) {
            res.status(400).json({ message: getErrorMessage(error) });
        }
    });

router.get(routes.getRecipesInCategoryRoute, async (req, res) => {
    const category = req.params.categoryName;

    const searchName = req.query.searchName;
    const page = parseInt(req.query.page || "1");

    try {
        const { recipes, totalPages } = await recipeManager.getAll(category, page, searchName);
        res.status(200).json({ message: successMsg.getRecipesInCategorySuccess, result: recipes, totalPages });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

router.get(routes.getRecipeDetailsRoute, async (req, res) => {
    const recipeId = req.params.recipeId;
    const userId = req.user?._id;

    try {
        const recipe = await recipeManager.getRecipeDetails(recipeId, userId);
        res.status(200).json({ message: successMsg.getRecipeDetailsSuccess, result: recipe });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

router.get(routes.getUnapprovedRecipesRoute, isAdmin, async (req, res) => {
    const recipes = await recipeManager.getUnapproved();
    res.status(200).json({ message: successMsg.getUnapprovedRecipesSuccess, result: recipes });
});

router.put(routes.approveRecipeRoute, isAdmin, async (req, res) => {
    const recipeId = req.params.recipeId;

    try {
        const recipe = await recipeManager.approveRecipe(recipeId);
        res.status(200).json({ message: "Recipe approved successfully!", result: recipe });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

router.get('/user-recipes/:recipeType', isAuthenticated, async (req, res) => {
    const userId = req.user._id;
    const recipeType = req.params.recipeType;
    const searchName = req.query.searchName;
    const page = parseInt(req.query.page || "1");

    try {
        const result = await recipeManager.getUserRecipes
            (
                userId,
                searchName,
                page,
                recipeType
            );

        res.status(200).json
            (
                {
                    message: "User recipes retrieved successfully!",
                    result: result.recipes,
                    totalPages: result.totalPages
                }
            );
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
})

router.delete(routes.deleteRecipeRoute, isAuthenticated, async (req, res) => {
    const recipeId = req.params.recipeId;
    const userId = req.user._id;

    try {
        const result = await recipeManager.deleteRecipe(userId, recipeId);
        res.status(200).json({ message: 'Recipe deleted successfully!', result });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

router.get('/get-edit-details/:recipeId', async (req, res) => {
    const recipeId = req.params.recipeId;

    const result = await recipeManager.getEditRecipeDetails(recipeId);

    res.status(200).json({ message: 'Recipe edit details!', result });
});

router.put(
    '/edit/:recipeId',
    isAuthenticated,
    multer().single('recipeFile'),
    async (req, res) => {
        const recipeId = req.params.recipeId;
        const image = req.file;
        const data = req.body;
        const owner = req.user._id;

        try {
            const result = await recipeManager.edit(recipeId, data, image, owner);
            res.status(200).json({ message: 'Recipe edited successfully!', result });
        } catch (error) {
            res.status(400).json({ message: getErrorMessage(error) });
        }
    });


router.get('/get-most-recent', async (req, res) => {
    try {
        const result = await recipeManager.getMostRecentRecipes();
        res.status(200).json({ message: 'Most recent recipes retrieved successfully', result });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

router.get('/get-top-rated', async (req, res) => {
    try {
        const result = await recipeManager.getTopRatedRecipes();
        res.status(200).json({ message: 'Top rated recipes retrieved successfully', result });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

module.exports = router;