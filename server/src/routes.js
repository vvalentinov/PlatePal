const router = require('express').Router();

const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');

router.use('/user', userController);
router.use('/category', categoryController);

module.exports = router;