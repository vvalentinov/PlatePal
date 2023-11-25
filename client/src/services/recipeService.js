import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3000/recipe';

export const recipeServiceFactory = (token) => {
    const request = requestFactory(token);

    return {
        create: (data) =>
            request.post(`${baseUrl}/create`, data),
        getRecipe: (recipeId) =>
            request.get(`${baseUrl}/details/${recipeId}`),
        getAllUserRecipes: (searchQuery, pageNumber) =>
            request.get(`${baseUrl}/user-recipes?searchName=${searchQuery}&page=${pageNumber}`),
        getApprovedUserRecipes: (searchQuery, pageNumber) =>
            request.get(`${baseUrl}/user-recipes/approved?searchName=${searchQuery}&page=${pageNumber}`),
        getUnapprovedUserRecipes: (searchQuery, pageNumber) =>
            request.get(`${baseUrl}/user-recipes/unapproved?searchName=${searchQuery}&page=${pageNumber}`),
        approveRecipe: (recipeId) =>
            request.put(`${baseUrl}/approve/${recipeId}`),
        getEditDetails: (recipeId) =>
            request.get(`${baseUrl}/get-edit-details/${recipeId}`),
        edit: (recipeId, data) =>
            request.put(`${baseUrl}/edit/${recipeId}`, data),
        delete: (recipeId) =>
            request.delete(`${baseUrl}/delete/${recipeId}`),
        getAllInCategory: (categoryName, pageNumber) =>
            request.get(`${baseUrl}/all/${categoryName}?page=${pageNumber}`)
    }
};