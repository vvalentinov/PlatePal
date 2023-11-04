import { AuthContext } from "../../contexts/AuthContext";

import { useContext } from 'react';
import { Navigate, Outlet } from "react-router-dom";

import * as paths from '../../constants/pathNames';

const GuestRouteGuard = () => {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to={paths.loginPath} />
    }

    return <Outlet />;
};

export default GuestRouteGuard;