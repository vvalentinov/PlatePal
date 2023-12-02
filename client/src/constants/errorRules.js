export const fileRules = {
    required: { value: true, message: 'Image file is required!' },
    validate: (value) => {
        if (value.type !== 'image/png' && value.type !== 'image/jpeg') {
            return "Incorrect extension! Allowed extensions: .png, .jpeg and .jpg!"
        }
        return true;
    }
};

export const editRecipeFileRules = {
    validate: (value) => {
        if (value && value.type !== 'image/png' && value.type !== 'image/jpeg') {
            return "Incorrect extension! Allowed extensions: .png, .jpeg and .jpg!"
        }
        return true;
    }
};

export const recipeNameRules = {
    required: { value: true, message: 'Recipe Name is required!' },
    minLength: { value: 2, message: 'Recipe Name must be between 2 and 100 characters long!' },
    maxLength: { value: 100, message: 'Recipe Name must be between 2 and 100 characters long!' },
    pattern: { value: /^[a-zA-Z0-9\s-]*$/, message: 'Recipe Name must contain only letters, numbers and spaces!' }
};

export const recipeDescriptionRules = {
    required: { value: true, message: "Recipe Description is required!" },
    minLength: { value: 20, message: "Recipe description must be between 20 and 530 characters long!" },
    maxLength: { value: 530, message: "Recipe description must be between 20 and 530 characters long!" },
};

export const recipeYoutubeLinkRules = {
    required: false,
    pattern: {
        value: /^(https?:\/\/)?(www\.)?youtube\.com\/embed\/([\w-]+)(\S+)?$/,
        message: 'Invalid embedded youtube video link!'
    }
};

export const recipeCookingTimeRules = {
    required: { value: true, message: 'Recipe Cook Time is required!' },
    min: { value: 5, message: 'Recipe cooking time must be between 5 and 1440 minutes!' },
    max: { value: 1440, message: 'Recipe cooking time must be between 5 and 1440 minutes!' },
};

export const recipePrepTimeRules = {
    required: { value: true, message: 'Recipe Prep Time is required!' },
    min: { value: 5, message: 'Recipe prep time must be between 5 and 1440 minutes!' },
    max: { value: 1440, message: 'Recipe prep time must be between 5 and 1440 minutes!' },
};

export const recipeServingsRules = {
    required: { value: true, message: 'Recipe Servings is required!' },
    min: { value: 1, message: 'Recipe servings must be between 1 and 100!' },
    max: { value: 100, message: 'Recipe servings must be between 1 and 100!' },
};

export const recipeIngredientRules = {
    required: { value: true, message: "Ingredient must not be empty!" },
    minLength: { value: 2, message: "Ingredient must be at least 2 characters long!" },
    maxLength: { value: 100, message: "Ingredient must not exceed 100 characters!" },
    pattern: { value: /^[a-zA-Z0-9\s-]*$/, message: 'Ingredient must contain only letters, numbers and spaces!' }
};

export const recipeStepRules = {
    required: { value: true, message: `Step must not be empty!` },
    minLength: { value: 5, message: `Step must be at least 5 characters long!` },
    maxLength: { value: 200, message: `Step must not exceed 200 characters!` }
};