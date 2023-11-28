import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3000/user';

export const authServiceFactory = (token) => {
    const authorizedRequest = requestFactory(token);
    const anonymousRequest = requestFactory();

    return {
        login: (data) => anonymousRequest.post(`${baseUrl}/login`, data),
        register: (data) => anonymousRequest.post(`${baseUrl}/register`, data),
        logout: () => authorizedRequest.get(`${baseUrl}/logout`),
    }
};