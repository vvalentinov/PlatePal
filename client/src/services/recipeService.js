import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3000/recipe';

export const recipeServiceFactory = (token) => {
    const request = requestFactory(token);

    return {
        create: (data) => request.post(`${baseUrl}/create`, data),
        getRecipe: (recipeId) => request.get(`${baseUrl}/details/${recipeId}`),
        getAllUserRecipes: (searchQuery) => request.get(`${baseUrl}/user-recipes?searchName=${searchQuery}`),
        getApprovedUserRecipes: (searchQuery) => request.get(`${baseUrl}/user-recipes/approved?searchName=${searchQuery}`),
        getUnapprovedUserRecipes: (searchQuery) => request.get(`${baseUrl}/user-recipes/unapproved?searchName=${searchQuery}`)
        // searchAllUserRecipes: (searchName) => request.get(`${baseUrl}/search-user-recipes/?search=${searchName}`),
        // searchApprovedUserRecipes: (searchName) => request.get(`${baseUrl}/search-user-recipes/approved?search=${searchName}`),
        // searchUnapprovedUserRecipes: (searchName) => request.get(`${baseUrl}/search-user-recipes/unapproved?search=${searchName}`)
    }
};