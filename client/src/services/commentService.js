import { requestFactory } from '../lib/requester';

const baseUrl = 'http://localhost:3000/comment';

export const commentServiceFactory = (token) => {
    const request = requestFactory(token);

    return {
        create: (data) => request.post(`${baseUrl}/create`, data),
        edit: (commentId, data) => request.put(`${baseUrl}/edit/${commentId}`, data),
        delete: (commentId) => request.delete(`${baseUrl}/delete/${commentId}`),
        like: (commentId) => request.put(`${baseUrl}/like/${commentId}`),
        getComments: (recipeId, type) => request.get(`${baseUrl}/get-recipe-comments/${recipeId}/${type}`)
    }
};