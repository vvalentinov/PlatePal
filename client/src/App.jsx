import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './App.css';

import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Logout from './components/Logout/Logout';
import Navigation from './components/Navigation/Navigation';
import CreateCategory from './components/CreateCategory/CreateCategory';
import Categories from './components/Categories/Categories';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
import Recipes from './components/Recipes/Recipes';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
import Footer from './components/Footer/Footer';
import UnapprovedRecipesList from './components/UnapprovedRecipesList/UnapprovedRecipesList';
import UserRecipesList from './components/UserRecipesList/UserRecipesList';

import { AuthProvider } from './contexts/AuthContext';

import { Route, Routes } from 'react-router-dom';

import * as paths from './constants/pathNames';

import GuestRouteGuard from './components/common/GuestRouteGuard';

const App = () => {
    return (
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
                    <Route path={paths.allRecipesPath} element={<Recipes />} />
                    <Route path={paths.recipeDetailsPath} element={<RecipeDetails />} />
                    <Route path='/recipe/user-recipes/:recipeType' element={<UserRecipesList />} />
                    <Route element={<GuestRouteGuard />}>
                        <Route path={paths.recipeCreatePath} element={<CreateRecipe />} />
                        <Route path={paths.logoutPath} element={<Logout />} />
                    </Route>
                    <Route path='/recipe/all/unapproved' element={<UnapprovedRecipesList />} />
                </Routes>
            </main>
            <Footer />
        </AuthProvider>
    );
}

export default App;
