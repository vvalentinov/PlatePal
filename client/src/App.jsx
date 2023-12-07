import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './App.css';

import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Logout from './components/Logout/Logout';
import Header from './components/Header/Header';
import CreateCategory from './components/CreateCategory/CreateCategory';
import Categories from './components/Categories/Categories';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
import RecipesInCategory from './components/RecipesInCategory/RecipesInCategory';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
import Footer from './components/Footer/Footer';
import UnapprovedRecipesList from './components/UnapprovedRecipesList/UnapprovedRecipesList';
import EditRecipe from './components/EditRecipe/EditRecipe';
import UserRecipes from './components/UserRecipes/UserRecipes';
import UserFavoruiteRecipes from './components/UserFavouriteRecipes/UserFavouriteRecipes';
import UserProfile from './components/UserProfile/UserProfile';
import EditCategory from './components/EditCategory/EditCategory';
import ManageUsers from './components/ManageUsers/ManageUsers';
import NoPathFound from './components/NoPathFound/NoPathFound';
import Spoonacular from './components/Spoonacular/Spoonacular';
import SpoonacularRecipeDetails from './components/SpoonacularRecipeDetails/SpoonacularRecipeDetails';

import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import GuestRouteGuard from './components/common/GuestRouteGuard';
import AuthRouteGuard from './components/common/AuthRouteGuard';
import AdminRouteGuard from './components/common/AdminRouteGuard';

import * as paths from './constants/pathNames';

const App = () => {
    return (
        <AuthProvider>
            <Header />
            <main>
                <Routes>
                    <Route path={paths.homePath} element={<Home />} />
                    <Route path={paths.categoriesListPath} element={<Categories />} />
                    <Route path={paths.allRecipesPath} element={<RecipesInCategory />} />
                    <Route path={paths.recipeDetailsPath} element={<RecipeDetails />} />
                    <Route path='*' element={<NoPathFound />} />

                    <Route element={<AuthRouteGuard />}>
                        <Route path={paths.loginPath} element={<Login />} />
                        <Route path={paths.registerPath} element={<Register />} />
                    </Route>

                    <Route element={<GuestRouteGuard />}>
                        <Route path={paths.recipeCreatePath} element={<CreateRecipe />} />
                        <Route path={paths.logoutPath} element={<Logout />} />
                        <Route path={paths.userFavoriteRecipesPath} element={<UserFavoruiteRecipes />} />
                        <Route path={paths.userProfilePath} element={<UserProfile />} />
                        <Route path={paths.editRecipePath} element={<EditRecipe />} />
                        <Route path={paths.userRecipesPath} element={<UserRecipes />} />
                        <Route path='/spoonacular' element={<Spoonacular />} />
                        <Route path='/spoonacular-recipe-details/:recipeId' element={<SpoonacularRecipeDetails />} />
                    </Route>

                    <Route element={<AdminRouteGuard />}>
                        <Route path={paths.editCategoryPath} element={<EditCategory />} />
                        <Route path={paths.createCategoryPath} element={<CreateCategory />} />
                        <Route path={paths.manageUsersPath} element={<ManageUsers />} />
                        <Route path={paths.unapprovedRecipesPath} element={<UnapprovedRecipesList />} />
                    </Route>
                </Routes>
            </main>
            <Footer />
        </AuthProvider>
    );
}

export default App;
