const mongoose = require('mongoose');

const errors = require('../constants/errorMessages/categoryErrors');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, errors.categoryNameRequiredError],
        min: [2, errors.categoryNameLengthError(2, 40)],
        max: [40, errors.categoryNameLengthError(2, 40)]
    },
    description: {
        type: String,
        required: [true, errors.categoryDescriptionRequiredError],
        min: [200, errors.categoryDescriptionLengthError(200, 750)],
        max: [750, errors.categoryDescriptionLengthError(200, 750)]
    },
    image: {
        publicId: {
            type: String,
            required: [true, errors.categoryPublicIdRequiredError],
        },
        url: {
            type: String,
            required: [true, errors.categoryURLRequiredError],
        },
    },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;