exports.recipeNameRequiredError = 'Recipe name is required!';
exports.recipeNameMinLengthError = (count) => `Recipe name must be at least ${count} characters long!`;
exports.recipeNameMaxLengthError = (count) => `Recipe name must not exceed ${count} characters!`;

exports.recipeDescriptionRequiredError = 'Recipe description is required!';
exports.recipeDescriptionMinLengthError = (count) => `Recipe description must be at least ${count} characters long!`;
exports.recipeDescriptionMaxLengthError = (count) => `Recipe description must not exceed ${count} characters!`;

exports.recipeCookingTimeRequiredError = 'Recipe cooking time is required!';
exports.recipeCookingTimeMinError = (minutes) => `Recipe cooking time minutes must be at least ${minutes}`;
exports.recipeCookingTimeMaxError = (minutes) => `Recipe cooking time minutes must not exceed ${minutes}`;

exports.recipeIngredientsRequiredError = 'Recipe must have a list of ingredients!';
exports.recipeIngredientsCountError = (min, max) => `Recipe ingredients must be between ${min} and ${max}!`;

exports.recipeStepsRequiredError = 'Recipe must have a list of steps to complete!';
exports.recipeStepsCountError = (min, max) => `Recipe steps must be between ${min} and ${max}!`;

exports.recipeOwnerRequiredError = 'Recipe must have an owner!';

exports.recipeCategoryRequiredError = 'Recipe must have a category!';