import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3000/recipe';

export const recipeServiceFactory = (token) => {
    const request = requestFactory(token);

    return {
        create: (data) => request.post(`${baseUrl}/create`, data),
        getRecipe: (recipeId) => request.get(`${baseUrl}/details/${recipeId}`)
    }
};