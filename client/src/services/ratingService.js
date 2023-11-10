import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3000/rating';

export const ratingServiceFactory = (token) => {
    const request = requestFactory(token);

    return {
        rateRecipe: (recipeId, data) => request.post(`${baseUrl}/rate-recipe/${recipeId}`, data)
    }
};