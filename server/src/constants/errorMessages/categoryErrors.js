exports.categoryNameRequiredError = 'Category name is required!';
exports.categoryNameLengthError = (min, max) => `Category name must be between ${min} and ${max} characters long!`;

exports.categoryDescriptionRequiredError = 'Category description is required!';
exports.categoryDescriptionLengthError = (min, max) => `Category description must be between ${min} and ${max} characters long!`;

exports.categoryPublicIdRequiredError = 'Category image file must have a public ID!';
exports.categoryURLRequiredError = 'Category image file must have a url!';

exports.categoryInvalidIdFormat = 'Invalid category id format!';

exports.categoryInvalidError = 'Category does not exist!';

exports.categoryWithNameExistsError = 'Category with given name already exists!';