export const extractRecipeFormData = (data) => {
    const formData = new FormData();

    if (data.recipeYoutubeLink) {
        formData.append("youtubeLink", data.recipeYoutubeLink);
    }

    if (data.recipeName) {
        formData.append("name", data.recipeName);
    }

    if (data.recipeFile) {
        formData.append("recipeFile", data.recipeFile);
    }

    if (data.recipeDescription) {
        formData.append("description", data.recipeDescription);
    }

    if (data.recipeCookTime) {
        formData.append("cookingTime", Number(data.recipeCookTime));
    }

    if (data.recipePrepTime) {
        formData.append("prepTime", Number(data.recipePrepTime));
    }

    if (data.recipeServings) {
        formData.append("servings", Number(data.recipeServings));
    }

    if (data.recipeCategory) {
        formData.append("category", data.recipeCategory);
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