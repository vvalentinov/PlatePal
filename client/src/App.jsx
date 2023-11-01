// Import CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './App.css';

// Import Components
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Logout from './components/Logout/Logout';
import Navigation from './components/Navigation/Navigation';
import CreateCategory from './components/CreateCategory/CreateCategory';
import Categories from './components/Categories/Categories';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
import Footer from './components/Footer/Footer';

// Import AuthContext
import { AuthProvider } from './contexts/AuthContext';

// Import Routes
import { Route, Routes } from 'react-router-dom';

// Import path names
import * as paths from './constants/pathNames';

const App = () => {
    return (
        <>
            <AuthProvider>
                <header>
                    <Navigation />
                </header>
                <main>
                    <Routes>
                        <Route path={paths.homePath} element={<Home />} />
                        <Route path={paths.loginPath} element={<Login />} />
                        <Route path={paths.registerPath} element={<Register />} />
                        <Route path={paths.createCategoryPath} element={<CreateCategory />} />
                        <Route path={paths.categoriesListPath} element={<Categories />} />
                        <Route path={paths.recipeCreatePath} element={<CreateRecipe />} />
                        <Route path={paths.logoutPath} element={<Logout />} />
                    </Routes>
                </main>
                <Footer />
            </AuthProvider>
        </>
    );
}

export default App;
