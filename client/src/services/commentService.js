import { requestFactory } from '../lib/requester';

const baseUrl = 'http://localhost:3000/comment';

export const commentServiceFactory = (token) => {
    const request = requestFactory(token);

    return {
        create: (data) => request.post(`${baseUrl}/create`, data),
        edit: (commentId, data) => request.put(`${baseUrl}/edit/${commentId}`, data),
        delete: (commentId) => request.delete(`${baseUrl}/delete/${commentId}`),
        like: (commentId) => request.put(`${baseUrl}/like/${commentId}`),
        getSortedByDateDesc: (recipeId) => request.get(`${baseUrl}/get-comments-by-date-desc/${recipeId}`),
        getSortedByDateAsc: (recipeId) => request.get(`${baseUrl}/get-comments-by-date-asc/${recipeId}`),
        getSortedByLikesDesc: (recipeId) => request.get(`${baseUrl}/get-comments-by-likes-desc/${recipeId}`),
        getUserComments: (recipeId) => request.get(`${baseUrl}/get-user-comments/${recipeId}`)
    }
};