import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3000/comment';

export const commentServiceFactory = (token) => {
    const authorizedRequest = requestFactory(token);
    const anonymousRequest = requestFactory();

    return {
        create: (data) => authorizedRequest.post(`${baseUrl}/create`, data),
        edit: (commentId, data) => authorizedRequest.put(`${baseUrl}/edit/${commentId}`, data),
        delete: (commentId) => authorizedRequest.delete(`${baseUrl}/delete/${commentId}`),
        like: (commentId) => authorizedRequest.put(`${baseUrl}/like/${commentId}`),
        getAll: (recipeId) => anonymousRequest.get(`${baseUrl}/all/${recipeId}`),
        getSortedCommentsByLikes: (recipeId) => anonymousRequest.get(`${baseUrl}/getSortedCommentsByLikes/${recipeId}`),
        getUserComments: (recipeId) => authorizedRequest.get(`${baseUrl}/user-comments/${recipeId}`)
    }
};