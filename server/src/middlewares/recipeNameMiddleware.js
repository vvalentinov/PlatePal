exports.isRecipeNameCorrectFormat = (req, res, next) => {
    const searchName = req.query.searchName;
    const regex = new RegExp(/^[a-zA-Z0-9\s]*$/);

    if (searchName && !regex.test(searchName)) {
        return res.status(400).json({ message: 'Recipe name must contain only letters, numbers or spaces!' })
    }

    next();
};