const baseUrl = 'https://api.spoonacular.com';

const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;

export const searchForRecipes = async (query) => {
    const response = await fetch(`${baseUrl}/recipes/complexSearch?apiKey=${apiKey}&query=${query}&number=1`);

    if (!response.ok) {
        throw new Error('There was an error!');
    }

    const result = await response.json();

    const recipes = result.results;


    return recipes;
};