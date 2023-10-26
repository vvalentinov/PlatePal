import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';

import { AuthContext } from './contexts/AuthContext';
import { useState } from 'react';
import * as authService from './services/authService';

import { useNavigate } from 'react-router-dom';

import * as paths from './constants/pathNames';

const App = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState({});

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
        try {
            const result = await authService.register(data);
            setAuth(result);
            navigate(paths.homePath);
        } catch (error) {
            console.log(error.message);
        }
    };

    const contextValue = {
        onLoginSubmit,
        onRegisterSubmit,
        userId: auth._id,
        username: auth.username,
        token: auth.token,
        isAuthenticated: !!auth.token,
    };

    return (
        <>
            <AuthContext.Provider value={contextValue}>
                <Header />
                <Main />
                <Footer />
            </AuthContext.Provider>
        </>
    );
}

export default App;
