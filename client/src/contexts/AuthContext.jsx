import { createContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

import * as authService from '../services/authService';

import * as paths from '../constants/pathNames';

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const navigate = useNavigate();

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

    const onLogout = () => {
        // TODO: Implement logout on server!
        setAuth({});
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