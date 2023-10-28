import { createContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from '../hooks/useLocalStorage';

import { authServiceFactory } from '../services/authService';

import * as paths from '../constants/pathNames';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [auth, setAuth] = useLocalStorage('auth', {});

    const authService = authServiceFactory(auth.token);

    const onLoginSubmit = async (data) => {
        try {
            const result = await authService.login(data);
            setAuth(result);
            navigate(paths.homePath);
        } catch (error) {
            console.log(error.message);
        }
    };

    const onRegisterSubmit = async (data) => {
        if (data.repeatPassword !== data.password) {
            return;
        }

        try {
            const result = await authService.register(data);
            setAuth(result);
            navigate(paths.homePath);
        } catch (error) {
            console.log(error.message);
        }
    };

    const onLogout = async () => {
        try {
            await authService.logout(auth.token);
            setAuth({});
        } catch (error) {
            console.log(error.message);
        }
    };

    const contextValue = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        userId: auth._id,
        username: auth.username,
        token: auth.token,
        isAuthenticated: !!auth.token,
    };

    return (
        <>
            <AuthContext.Provider value={contextValue}>
                {children}
            </AuthContext.Provider>
        </>
    );
};