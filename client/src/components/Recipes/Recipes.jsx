import styles from './Recipes.module.css';

import RecipeCardLink from '../RecipeCardLink/RecipeCardLink';

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { recipeServiceFactory } from '../../services/recipeService';
import { useService } from '../../hooks/useService';

import { categoriesListPath } from '../../constants/pathNames';

const Recipes = () => {
    const { category } = useParams();
    const navigate = useNavigate();

    const [recipes, setRecipes] = useState([]);

    const recipeService = useService(recipeServiceFactory);

    useEffect(() => {
        recipeService.getAllInCategory(category)
            .then(res => setRecipes(res.result))
            .catch(error => {
                const state = { toastMsg: error.message, isSuccessfull: false };
                navigate(categoriesListPath, { state });
            });
    }, [category]);

    return (
        <>
            {recipes.length > 0 ? (
                <div className={styles.container}>
                    {recipes.map(recipe => <RecipeCardLink
                        key={recipe._id}
                        recipe={recipe}
                        link={`/recipe/details/${recipe._id}`} />
                    )}
                </div>
            ) : <p>No Recipes Yet...</p>}
        </>
    );
};

export default Recipes;