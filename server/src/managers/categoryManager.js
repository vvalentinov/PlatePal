const Category = require('../models/Category');

const { uploadImage } = require('../utils/cloudinaryUtil');
const { validateImageFile } = require('../utils/imageFileValidatiorUtil');

const recipeManager = require('../managers/recipeManager');

exports.create = async (data, categoryImage) => {
    const categoryWithName = await Category.findOne({ name: data.categoryName });
    if (categoryWithName) {
        throw new Error('Category with given name already exists!');
    }

    validateImageFile(categoryImage);

    const { public_id, secure_url } = await uploadImage(categoryImage.buffer, 'Categories');

    const category = await Category.create({
        name: data.categoryName,
        description: data.categoryDescription,
        image: { publicId: public_id, url: secure_url }
    });

    return category;
};

exports.getAll = () => Category.find({});

exports.getById = (categoryId) => Category.findById(categoryId);

exports.getByName = (categoryName) => Category.findOne({ name: categoryName });

exports.getCategoryList = () => Category.find({}).select('_id name');