import { AuthContext } from "../../contexts/AuthContext";

import { useContext } from 'react';
import { Navigate, Outlet } from "react-router-dom";

import * as paths from '../../constants/pathNames';

const GuestRouteGuard = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to={paths.loginPath} />
    }

    return children ? children : <Outlet />;
};

export default GuestRouteGuard;