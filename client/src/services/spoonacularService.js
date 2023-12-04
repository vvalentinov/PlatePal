const baseUrl = 'https://api.spoonacular.com';

const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;

export const searchForRecipes = async (query) => {
    const response = await fetch(`${baseUrl}/recipes/complexSearch?apiKey=${apiKey}&query=${query}&number=18`);

    // {
    //     "status": "failure",
    //     "code": 402,
    //     "message": "Your daily points limit of 150 has been reached. Please upgrade your plan to continue using the API."
    // }

    if (response.status === 402) {
        throw new Error('Daily quote has been reached!');
    }

    const result = await response.json();

    const recipes = result.results;


    return recipes;
};

export const getRecipeDetails = async (recipeId) => {
    const response = await fetch(`${baseUrl}/recipes/${recipeId}/information?apiKey=${apiKey}&includeNutrition=false`);

    if (!response.ok) {
        throw new Error('There was an error!');
    }

    const analyzedInstructionsResponse = await fetch(`${baseUrl}/recipes/${recipeId}/analyzedInstructions?apiKey=${apiKey}`);
    if (!analyzedInstructionsResponse.ok) {
        throw new Error('There was an error!');
    }

    const result = await response.json();

    const instructions = await analyzedInstructionsResponse.json();

    return { result, instructions };
};