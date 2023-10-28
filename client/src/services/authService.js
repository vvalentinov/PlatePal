import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3000/user';

export const authServiceFactory = (token) => {
    const request = requestFactory(token);

    return {
        login: (data) => request.post(`${baseUrl}/login`, data),
        register: (data) => request.post(`${baseUrl}/register`, data),
        logout: () => request.get(`${baseUrl}/logout`),
    }
};

// export const login = (loginData) => request.post(`${baseUrl}/login`, loginData);

// export const register = (registerData) => request.post(`${baseUrl}/register`, registerData);

// export const logout = async (token) => {
//     const response = await fetch(`${baseUrl}/logout`, {
//         headers: {
//             'X-Authorization': token,
//         }
//     });


//     const result = await response.json();

//     return result;
// };

