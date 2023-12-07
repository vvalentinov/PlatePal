import { requestFactory } from '../lib/requester';

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
            request.put(`${baseUrl}/change-password`, data),
        makeAdmin: (userId) =>
            request.put(`${baseUrl}/make-admin/${userId}`),
        deleteUser: (userId) =>
            request.delete(`${baseUrl}/delete/${userId}`),
        deleteMyProfile: (userId) =>
            request.delete(`${baseUrl}/delete-my-profile/${userId}`),
        getFavouriteRecipes: () =>
            request.get(`${baseUrl}/get-user-favourite-recipes`)
    }
};