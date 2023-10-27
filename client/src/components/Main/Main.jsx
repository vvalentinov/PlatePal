import { Routes, Route } from 'react-router-dom';

import Home from "../Home/Home";
import Login from '../Login/Login';
import Register from '../Register/Register';
import Logout from '../Logout/Logout';

import * as paths from '../../constants/pathNames';

const Main = () => {

    return (
        <main>
            <Routes>
                <Route path={paths.homePath} element={<Home />} />
                <Route path={paths.loginPath} element={<Login />} />
                <Route path={paths.registerPath} element={<Register />} />
                <Route path={paths.logoutPath} element={<Logout />} />
            </Routes>
        </main>
    );
};

export default Main;