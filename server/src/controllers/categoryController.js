const router = require('express').Router();

const { createRoute } = require('../constants/routeNames/categoryRoutes');

const categoryService = require('../services/categoryService');

const { getErrorMessage } = require('../utils/errorMessageUtil');

const { isAdmin } = require('../middlewares/isAdminMiddleware');

const multer = require('multer');

router.post(
    createRoute,
    isAdmin,
    multer().single('categoryFile'),
    async (req, res) => {
        const image = req.file;
        const data = { ...req.body };
        try {
            await categoryService.create(data, image);
            res.status(200).json({ message: "Recipe category created successfully!" });
        } catch (error) {
            res.status(400).json({ message: getErrorMessage(error) });
        }
    });

module.exports = router;