const Category = require('../models/Category');

const { uploadImage, deleteImage } = require('../utils/cloudinaryUtil');
const { validateImageFile } = require('../utils/imageFileValidatiorUtil');

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

exports.edit = async (categoryId, image, data) => {
    const category = await Category.findById(categoryId);
    if (!category) {
        throw new Error('No category with given id found!');
    }

    const editedCategory = await Category.findByIdAndUpdate(
        categoryId,
        {
            name: data.categoryName,
            description: data.categoryDescription
        }
    );

    if (image) {
        validateImageFile(image);
        await deleteImage(category.image.publicId);

        const { public_id, secure_url } = await uploadImage(image.buffer, 'Categories');
        editedCategory.image.publicId = public_id;
        editedCategory.image.url = secure_url;
    }

    await editedCategory.save();

    return editedCategory;
};

exports.getAll = () => Category
    .find({})
    .sort({ 'name': 'asc' })
    .lean();

exports.getById = async (categoryId) => {
    const category = await Category.findById(categoryId);
    if (!category) {
        throw new Error('No category with given id found!');
    }

    return category;
}

exports.getByName = (categoryName) => Category.findOne({ name: categoryName });

exports.getCategoryList = () => Category
    .find({})
    .sort({ 'name': 'asc' })
    .select('_id name')
    .lean();