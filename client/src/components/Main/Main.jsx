import { Routes, Route } from 'react-router-dom';

import Home from "../Home/Home";
import Login from '../Login/Login';
import Register from '../Register/Register';

const Main = () => {
    return (
        <main>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </main>
    );
};

export default Main;