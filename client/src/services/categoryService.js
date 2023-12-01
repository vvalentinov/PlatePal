import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3000/category';

export const categoryServiceFactory = (token) => {
    const request = requestFactory(token);

    return {
        create: (data) => request.post(`${baseUrl}/create`, data),
        getAll: () => request.get(`${baseUrl}/all`),
        getCategoryList: () => request.get(`${baseUrl}/list`),
        edit: (categoryId, data) => request.put(`${baseUrl}/edit/${categoryId}`, data),
        getById: (categoryId) => request.get(`${baseUrl}/get-category/${categoryId}`),
        delete: (categoryId) => request.delete(`${baseUrl}/delete/${categoryId}`)
    }
};