// Import CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// Import Components
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Logout from './components/Logout/Logout';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';

// Import AuthContext
import { AuthContext } from './contexts/AuthContext';

// Import useState hook from react
import { useState } from 'react';

// Import authentication service
import * as authService from './services/authService';

// Import React-Router specific things
import { useNavigate, Route, Routes } from 'react-router-dom';

// Import path names
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
        // await authService.logout();
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
                <header>
                    <Navigation />
                </header>
                <main>
                    <Routes>
                        <Route path={paths.homePath} element={<Home />} />
                        <Route path={paths.loginPath} element={<Login />} />
                        <Route path={paths.registerPath} element={<Register />} />
                        <Route path={paths.logoutPath} element={<Logout />} />
                    </Routes>
                </main>
                <Footer />
            </AuthContext.Provider>
        </>
    );
}

export default App;
