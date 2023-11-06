const path = require('path');

exports.validateImageFile = (file) => {
    const imageExt = path.extname(recipeImage.originalname);
    if (imageExt != '.png' &&
        imageExt != '.jpg' &&
        imageExt != '.jpeg') {
        throw new Error('Invalid image extension! Image file must be in format: .png, .jpg or .jpeg!');
    }

    if (recipeImage.size > (3 * 1024 * 1024)) {
        throw new Error('Image is too big! Must be less than 3 MB!');
    }
};