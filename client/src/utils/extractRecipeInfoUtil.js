export const extractRecipeFormData = (data) => {
    const formData = new FormData();

    if (data.recipeYoutubeLink) {
        formData.append("youtubeLink", data.recipeYoutubeLink);
    }

    formData.append("recipeFile", data.recipeFile);
    formData.append("recipeName", data.recipeName);
    formData.append("recipeDescription", data.recipeDescription);
    formData.append("recipeCookingTime", Number(data.recipeCookTime));
    formData.append("recipePrepTime", Number(data.recipePrepTime));
    formData.append("recipeServings", Number(data.recipeServings));
    formData.append("recipeCategory", data.recipeCategory);

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