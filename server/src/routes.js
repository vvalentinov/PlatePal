const router = require('express').Router();

const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const recipeController = require('./controllers/recipeController');

router.use('/user', userController);
router.use('/category', categoryController);
router.use('/recipe', recipeController);

module.exports = router;