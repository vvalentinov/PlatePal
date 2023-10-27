import * as request from './requester';

const baseUrl = 'http://localhost:3000/user';

export const login = (loginData) => request.post(`${baseUrl}/login`, loginData);

export const register = (registerData) => request.post(`${baseUrl}/register`, registerData);

export const logout = () => request.get(`${baseUrl}/logout`);
