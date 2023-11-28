import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3000/recipe';

export const recipeServiceFactory = (token) => {
    const authorizedRequest = requestFactory(token);
    const anonymousRequest = requestFactory();

    return {
        create: (data) =>
            authorizedRequest.post(`${baseUrl}/create`, data),
        getAllInCategory: (categoryName, pageNumber, searchName) =>
            anonymousRequest.get(`${baseUrl}/all/${categoryName}?searchName=${searchName ? searchName : ''}&page=${pageNumber}`),
        getRecipe: (recipeId) =>
            anonymousRequest.get(`${baseUrl}/details/${recipeId}`),
        getAllUserRecipes: (searchQuery, pageNumber, recipeType) =>
            authorizedRequest.get(`${baseUrl}/user-recipes/${recipeType}?searchName=${searchQuery ? searchQuery : ''}&page=${pageNumber}`),
        approveRecipe: (recipeId) =>
            authorizedRequest.put(`${baseUrl}/approve/${recipeId}`),
        getEditDetails: (recipeId) =>
            authorizedRequest.get(`${baseUrl}/get-edit-details/${recipeId}`),
        edit: (recipeId, data) =>
            authorizedRequest.put(`${baseUrl}/edit/${recipeId}`, data),
        delete: (recipeId) =>
            authorizedRequest.delete(`${baseUrl}/delete/${recipeId}`),
        getMostRecent: () =>
            anonymousRequest.get(`${baseUrl}/get-most-recent`),
        getTopRated: () =>
            anonymousRequest.get(`${baseUrl}/get-top-rated`)
    }
};