const router = require('express').Router();

const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const recipeController = require('./controllers/recipeController');
const commentController = require('./controllers/commentController');
const ratingController = require('./controllers/ratingController');

router.use('/user', userController);
router.use('/category', categoryController);
router.use('/recipe', recipeController);
router.use('/comment', commentController);
router.use('/rating', ratingController);

module.exports = router;