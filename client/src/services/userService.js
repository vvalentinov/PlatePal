import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3000/user';

export const userServiceFactory = (token) => {
    const request = requestFactory(token);

    return {
        addRecipeToFavorites: (recipeId) =>
            request.put(`${baseUrl}/add-recipe-to-favourites/${recipeId}`),
        getAllUsers: (userRole) =>
            request.get(`${baseUrl}/get-all/${userRole}`),
        changeUsername: (data) =>
            request.put(`${baseUrl}/change-username`, data),
        changePassword: (data) =>
            request.put(`${baseUrl}/change-password`, data)
    }
};