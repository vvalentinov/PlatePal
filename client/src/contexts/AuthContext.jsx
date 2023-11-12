import { createContext } from 'react';

import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useLocalStorage('auth', {});

    const userLogin = (data) => setAuth(data);

    const userLogout = () => setAuth({});

    const contextValue = {
        userLogin,
        userLogout,
        userId: auth.userId,
        username: auth.username,
        token: auth.token,
        isAuthenticated: !!auth.token,
        isAdmin: auth.isAdmin && !!auth.token,
    };

    return (
        <>
            <AuthContext.Provider value={contextValue}>
                {children}
            </AuthContext.Provider>
        </>
    );
};