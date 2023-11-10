const router = require('express').Router();

const ratingManager = require('../managers/ratingManager');
const recipeManager = require('../managers/recipeManager');

const { isAuthenticated } = require('../middlewares/authMiddleware');

const { getErrorMessage } = require('../utils/errorMessageUtil');
const { checkIfRecipeExists } = require('../utils/checkIfRecipeExistsUtil');

router.post(
    '/rate-recipe/:recipeId',
    isAuthenticated,
    async (req, res) => {
        const recipeId = req.params.recipeId;
        const userId = req.user._id;
        const { rateValue } = req.body;

        try {
            const result = await ratingManager.rateRecipe(recipeId, userId, rateValue);
            res.status(200).json({ message: 'Recipe rated successfully', result });
        } catch (error) {
            res.status(400).json({ message: getErrorMessage(error) });
        }
    });

// router.get(
//     '/getRating/:recipeId',
//     isAuthenticated,
//     async (req, res) => {
//         const recipeId = req.params.recipeId;
//         const userId = req.user._id;
//         try {
//             await checkIfRecipeExists(recipeId);
//             const value = await ratingManager.getRating(userId, recipeId);
//             res.status(200).json({ message: 'User rating retrieved successfully!', result: value });
//         } catch (error) {
//             res.status(400).json({ message: getErrorMessage(error) });
//         }
//     });

module.exports = router;