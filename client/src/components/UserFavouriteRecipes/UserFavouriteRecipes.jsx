import styles from './UserFavouriteRecipes.module.css';

import RecipeCardLink from '../RecipeCardLink/RecipeCardLink';

import { AuthContext } from '../../contexts/AuthContext';

import { useState, useEffect, useContext } from 'react';

const UserFavoruiteRecipes = () => {
    const { userId, token } = useContext(AuthContext);

    const [favouriteRecipes, setFavouriteRecipes] = useState();

    useEffect(() => {
        fetch(`http://localhost:3000/user/get-user-favourite-recipes`, {
            headers: { 'X-Authorization': token }
        })
            .then(res => res.json())
            .then(res => setFavouriteRecipes(res.result))
            .catch(error => console.log(error.message));
    }, []);

    return (
        <>
            <h2 className='text-center'>My Favourite Recipes</h2>
            {favouriteRecipes && (
                <div className={styles.recipesContainer}>
                    {
                        favouriteRecipes.map(recipe => <RecipeCardLink
                            key={recipe._id}
                            recipe={recipe}
                            link={`/recipe/details/${recipe._id}`} />
                        )
                    }
                </div>
            )}
        </>
    )
};

export default UserFavoruiteRecipes;