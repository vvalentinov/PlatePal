import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3000/category';

export const categoryServiceFactory = (token) => {
    const authorizedRequest = requestFactory(token);
    const anonymousRequest = requestFactory();

    return {
        create: (data) => authorizedRequest.post(`${baseUrl}/create`, data),
        getAll: () => anonymousRequest.get(`${baseUrl}/all`),
        getCategoryList: () => anonymousRequest.get(`${baseUrl}/list`)
    }
};