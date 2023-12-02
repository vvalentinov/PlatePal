import { AuthContext } from "../../contexts/AuthContext";

import { useContext } from 'react';
import { Navigate, Outlet } from "react-router-dom";

import * as paths from '../../constants/pathNames';

const AdminRouteGuard = ({ children }) => {
    const { isAdmin } = useContext(AuthContext);

    if (!isAdmin) {
        return <Navigate to={paths.homePath} />
    }

    return children ? children : <Outlet />;
};

export default AdminRouteGuard;