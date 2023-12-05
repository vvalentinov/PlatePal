const Category = require('../models/Category');

const recipeManager = require('./recipeManager');

const { uploadImage, deleteImage } = require('../utils/cloudinaryUtil');
const { validateImageFile } = require('../utils/imageFileValidatiorUtil');

const errorMessages = require('../constants/errorMessages/categoryErrors');

exports.create = async (data, categoryImage) => {
    const categoryWithName = await Category.findOne({ name: data.categoryName });
    if (categoryWithName) {
        throw new Error(errorMessages.categoryWithNameExistsError);
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
        throw new Error(errorMessages.categoryInvalidError);
    }

    if (!data.categoryName) {
        throw new Error(errorMessages.categoryNameRequiredError);
    }

    if (data.categoryName.length < 2 || data.categoryName.length > 40) {
        throw new Error(errorMessages.categoryNameLengthError(2, 40));
    }

    if (!data.categoryDescription) {
        throw new Error(errorMessages.categoryDescriptionRequiredError);
    }

    if (data.categoryDescription.length < 200 || data.categoryDescription.length > 750) {
        throw new Error(errorMessages.categoryDescriptionLengthError(200, 750));
    }

    const editedCategory = await Category.findByIdAndUpdate(
        categoryId,
        {
            name: data.categoryName,
            description: data.categoryDescription
        },
        { new: true }
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
        throw new Error(errorMessages.categoryInvalidError);
    }

    return category;
}

exports.getByName = (categoryName) => Category.findOne({ name: categoryName });

exports.getCategoryList = () => Category
    .find({})
    .sort({ 'name': 'asc' })
    .select('_id name')
    .lean();

exports.deleteCategory = async (categoryId) => {
    const category = await Category.findById(categoryId);
    if (!category) {
        throw new Error(errorMessages.categoryInvalidError);
    }

    await deleteImage(category.image.publicId);

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    await recipeManager.deleteAllRecipesInCategory(categoryId);

    return deletedCategory;
};