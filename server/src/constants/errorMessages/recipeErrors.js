exports.recipeNameRequiredError = 'Recipe name is required!';
exports.recipeNameMinLengthError = (count) => `Recipe name must be at least ${count} characters long!`;
exports.recipeNameMaxLengthError = (count) => `Recipe name must not exceed ${count} characters!`;

exports.recipeDescriptionRequiredError = 'Recipe description is required!';
exports.recipeDescriptionMinLengthError = (count) => `Recipe description must be at least ${count} characters long!`;
exports.recipeDescriptionMaxLengthError = (count) => `Recipe description must not exceed ${count} characters!`;

exports.recipeCookingTimeRequiredError = 'Recipe cooking time is required!';
exports.recipeCookingTimeMinError = (minutes) => `Recipe cooking time minutes must be at least ${minutes}`;
exports.recipeCookingTimeMaxError = (minutes) => `Recipe cooking time minutes must not exceed ${minutes}`;
exports.recipeCookingTimeTypeError = 'Recipe cooking time must be of type number!';

exports.recipeIngredientsRequiredError = 'Recipe must have a list of ingredients!';
exports.recipeIngredientsCountError = (min, max) => `Recipe ingredients must be between ${min} and ${max}!`;
exports.recipeIngredientLengthError = (min, max) => `Recipe ingredient must be between ${min} and ${max} characters long!`;
exports.recipeIngredientsMatchError = 'Recipe ingredients must contain only letters, numbers and spaces!';

exports.recipeStepsRequiredError = 'Recipe must have a list of steps to complete!';
exports.recipeStepsCountError = (min, max) => `Recipe steps must be between ${min} and ${max}!`;
exports.recipeStepLengthError = (min, max) => `Recipe step must be between ${min} and ${max} characters long!`;

exports.recipeOwnerRequiredError = 'Recipe must have an owner!';

exports.recipeCategoryRequiredError = 'Recipe must have a category!';

exports.recipeNameMatchError = 'Recipe name must contain only letters, numbers or spaces!';

exports.recipeImagePublicIdRequiredError = 'Recipe image public id is required!';
exports.recipeImageUrlRequiredError = 'Recipe image url is required!';

exports.recipePrepTimeRequiredError = 'Recipe prep time is required!';
exports.recipePrepTimeTypeError = 'Recipe prep time must be of type number!';
exports.recipePrepTimeRangeError = (min, max) => `Recipe prep time must be between ${min} and ${max} minutes long!`;

exports.recipeServingsRequiredError = 'Recipe servings is required!';
exports.recipeServingsTypeError = 'Recipe servings must be of type number!';
exports.recipeServingsRangeError = (min, max) => `Recipe servings must be between ${min} and ${max}!`;

exports.recipeYoutubeLinkFormatError = 'Invalid embedded youtube link format!';

exports.recipeWithNameExistError = 'Recipe with given name already exists!';

exports.recipeNotFoundWithId = 'Recipe with given id not found!';

exports.recipeInvalidIdFormat = 'Invalid recipe id format!';

exports.recipeOwnerEditError = 'You have to be the recipe owner to edit it!';