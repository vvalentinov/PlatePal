const router = require('express').Router();

const categoryService = require('../services/categoryService');

const { getErrorMessage } = require('../utils/errorMessageUtil');

const multer = require('multer');

router.post('/create', multer().single('file'), async (req, res) => {
    const image = req.file;
    const data = { ...req.body };
    // console.log(image);
    // console.log(data);
    try {
        await categoryService.create(data, image);
        res.status(200).json({ message: "Created successfully!" });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

module.exports = router;