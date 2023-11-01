const Category = require('../models/Category');

const { uploadImage } = require('../utils/cloudinaryUtil');

const path = require('path');

exports.create = async (data, categoryImage) => {
    const categoryWithName = await Category.findOne({ name: data.categoryName });
    if (categoryWithName) {
        throw new Error('Category with given name already exists!');
    }

    const imageExt = path.extname(categoryImage.originalname);
    if (imageExt != '.png' &&
        imageExt != '.jpg' &&
        imageExt != '.jpeg') {
        throw new Error('Image file must be in format: .png, .jpg or .jpeg!');
    }

    const { public_id, secure_url } = await uploadImage(categoryImage.buffer, 'Categories');

    const category = await Category.create({
        name: data.categoryName,
        description: data.categoryDescription,
        image: {
            publicId: public_id,
            url: secure_url,
        },
    });
};

exports.getAll = () => Category.find({});