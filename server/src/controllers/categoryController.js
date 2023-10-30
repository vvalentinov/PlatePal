const router = require('express').Router();

const multer = require('multer');

router.post('/create', multer().single('file'), (req, res) => {
    const image = req.file;
    console.log(image);
    const data = { ...req.body };
    console.log(data);
    res.status(200).json({ message: "Check the server!" });
});

module.exports = router;