const router = require('express').Router();
const multer = require('multer');

const routes = require('../constants/routeNames/categoryRoutes');
const categoryManager = require('../managers/categoryManager');
const { getErrorMessage } = require('../utils/errorMessageUtil');
const { isAdmin } = require('../middlewares/isAdminMiddleware');
const successMessages = require('../constants/successMessages/category');

router.post(
    routes.createCategoryRoute,
    isAdmin,
    multer().single('categoryFile'),
    async (req, res) => {
        const image = req.file;
        const data = { ...req.body };

        try {
            const result = await categoryManager.create(data, image);
            res.status(201).json({
                message: successMessages.createCategorySuccess,
                result
            });
        } catch (error) {
            res.status(400).json({ message: getErrorMessage(error) });
        }
    });

router.put(
    routes.editCategoryRoute,
    isAdmin,
    multer().single('categoryFile'),
    async (req, res) => {
        const categoryId = req.params.categoryId;
        const image = req.file;
        const data = { ...req.body };

        try {
            const result = await categoryManager.edit(categoryId, image, data);
            res.status(200).json({
                message: successMessages.editedCategorySuccess,
                result
            });
        } catch (error) {
            res.status(400).json({ message: getErrorMessage(error) });
        }
    });

router.get(routes.getAllCategoriesRoute, async (req, res) => {
    try {
        const result = await categoryManager.getAll();
        res.status(200).json({
            message: successMessages.getCategoriesSuccess,
            result
        });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

router.get(routes.getCategoryList, async (req, res) => {
    try {
        const result = await categoryManager.getCategoryList();
        res.status(200).json({
            message: successMessages.getCategoriesListSuccess,
            result
        });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

router.get(routes.getCategoryRoute, async (req, res) => {
    const categoryId = req.params.categoryId;

    try {
        const category = await categoryManager.getById(categoryId);
        res.status(200).json({
            message: successMessages.getCategorySuccess,
            result: category
        });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

router.delete(routes.deleteCategoryRoute, isAdmin, async (req, res) => {
    const categoryId = req.params.categoryId;

    try {
        const result = await categoryManager.deleteCategory(categoryId);
        res.status(200).json({
            message: successMessages.deleteCategorySuccess,
            result
        });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

module.exports = router;