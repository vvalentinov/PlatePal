const mongoose = require('mongoose');

const errors = require('../constants/errorMessages/categoryErrors');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, errors.categoryNameRequiredError],
    },
    description: {
        type: String,
        required: [true, errors.categoryDescriptionRequiredError],
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