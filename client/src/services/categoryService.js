import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3000/category';

export const categoryServiceFactory = (token) => {
    const request = requestFactory(token);

    return {
        create: (data) => request.post(`${baseUrl}/create`, data),
        getAll: () => request.get(`${baseUrl}/all`),
    }
};