import { useState, useEffect } from 'react';

import { useService } from '../../hooks/useService';
import { userServiceFactory } from '../../services/userService';

import ToastNotification from '../Toast/ToastNotification';

import RecipesSection from '../RecipesSection/RecipesSection';

const UserFavoruiteRecipes = () => {
    const userService = useService(userServiceFactory);

    const [favouriteRecipes, setFavouriteRecipes] = useState();
    const [toastMsg, setToastMsg] = useState('');

    useEffect(() => {
        userService.getFavouriteRecipes()
            .then(res => setFavouriteRecipes(res.result))
            .catch(error => setToastMsg(error.message))
            .finally(() => window.scrollTo(0, 0));
    }, []);

    return (
        <>
            {
                toastMsg &&
                <ToastNotification
                    message={toastMsg}
                    onExited={() => setToastMsg('')} />
            }
            <h2 className='text-center text-white text-uppercase mt-5'>My Favorite Recipes</h2>
            {favouriteRecipes && <RecipesSection recipes={favouriteRecipes} />}
        </>
    )
};

export default UserFavoruiteRecipes;