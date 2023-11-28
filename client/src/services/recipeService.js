import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3000/recipe';

export const recipeServiceFactory = (token) => {
    const request = requestFactory(token);

    return {
        create: (data) =>
            request.post(`${baseUrl}/create`, data),
        getAllInCategory: (categoryName, pageNumber, searchName) =>
            request.get(`${baseUrl}/all/${categoryName}?searchName=${searchName ? searchName : ''}&page=${pageNumber}`),
        getRecipe: (recipeId) =>
            request.get(`${baseUrl}/details/${recipeId}`),
        getAllUserRecipes: (searchQuery, pageNumber, recipeType) =>
            request.get(`${baseUrl}/user-recipes/${recipeType}?searchName=${searchQuery ? searchQuery : ''}&page=${pageNumber}`),
        approveRecipe: (recipeId) =>
            request.put(`${baseUrl}/approve/${recipeId}`),
        getEditDetails: (recipeId) =>
            request.get(`${baseUrl}/get-edit-details/${recipeId}`),
        edit: (recipeId, data) =>
            request.put(`${baseUrl}/edit/${recipeId}`, data),
        delete: (recipeId) =>
            request.delete(`${baseUrl}/delete/${recipeId}`),
        getMostRecent: () =>
            request.get(`${baseUrl}/get-most-recent`),
        getTopRated: () =>
            request.get(`${baseUrl}/get-top-rated`)
    }
};