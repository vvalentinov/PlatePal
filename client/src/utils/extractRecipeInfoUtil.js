export const extractRecipeFormData = (data) => {
    const formData = new FormData();

    if (data.recipeYoutubeLink) {
        formData.append("youtubeLink", data.recipeYoutubeLink);
    }

    if (data.recipeName) {
        formData.append("recipeName", data.recipeName);
    }

    if (data.recipeFile) {
        formData.append("recipeFile", data.recipeFile);
    }

    if (data.recipeDescription) {
        formData.append("recipeDescription", data.recipeDescription);
    }

    if (data.recipeCookTime) {
        formData.append("recipeCookingTime", Number(data.recipeCookTime));
    }

    if (data.recipePrepTime) {
        formData.append("recipePrepTime", Number(data.recipePrepTime));
    }

    if (data.recipeServings) {
        formData.append("recipeServings", Number(data.recipeServings));
    }

    if (data.recipeCategory) {
        formData.append("recipeCategory", data.recipeCategory);
    }

    if (data.ingredients) {
        const ingredients = data.ingredients.map(ingredient => ingredient.name);
        ingredients.forEach((ingredient, index) => formData.append(`ingredients[${index}]`, ingredient));
    }

    if (data.steps) {
        const steps = data.steps.map(step => step.name);
        steps.forEach((step, index) => formData.append(`steps[${index}]`, step));
    }

    return formData;
};