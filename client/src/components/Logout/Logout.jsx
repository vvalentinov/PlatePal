import { Navigate } from 'react-router-dom';

import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

import { useNavigate } from 'react-router-dom';

import * as paths from '../../constants/pathNames';

import { authServiceFactory } from '../../services/authService';

const Logout = () => {
    const { userLogout, token } = useContext(AuthContext);

    const navigate = useNavigate();
    const authService = authServiceFactory(token);

    useEffect(() => {
        authService.logout()
            .then(res => {
                userLogout();
                localStorage.clear();
                navigate(paths.homePath);
            })
            .catch(() => {
                navigate(paths.homePath)
            })
    }, []);

    return <Navigate to={paths.homePath} />;
};

export default Logout;