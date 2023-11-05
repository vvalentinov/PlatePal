export const extractRecipeFormData = (data) => {
    const ingredients = data.ingredients.map(ingredient => ingredient.name);
    const steps = data.steps.map(step => step.name);

    const formData = new FormData();
    formData.append("recipeFile", data.recipeFile);
    formData.append("recipeName", data.recipeName);
    formData.append("recipeDescription", data.recipeDescription);
    formData.append("recipeCookingTime", data.recipeCookTime);
    formData.append("recipeCategory", data.recipeCategory);
    formData.append("youtubeLink", data.recipeYoutubeLink);
    ingredients.forEach((ingredient, index) => formData.append(`ingredients[${index}]`, ingredient));
    steps.forEach((step, index) => formData.append(`steps[${index}]`, step));

    return formData;
};