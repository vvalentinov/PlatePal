import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3000/comment';

export const commentServiceFactory = (token) => {
    const request = requestFactory(token);

    return {
        create: (data) => request.post(`${baseUrl}/create`, data),
        edit: (commentId, data) => request.put(`${baseUrl}/edit/${commentId}`, data),
        delete: (commentId) => request.delete(`${baseUrl}/delete/${commentId}`),
        like: (commentId) => request.put(`${baseUrl}/like/${commentId}`),
        getAll: (recipeId) => request.get(`${baseUrl}/all/${recipeId}`),
        getSortedCommentsByLikes: (recipeId) => request.get(`${baseUrl}/getSortedCommentsByLikes/${recipeId}`),
        getUserComments: (recipeId) => request.get(`${baseUrl}/user-comments/${recipeId}`)
    }
};