import { useState, useEffect } from 'react';

import { recipeServiceFactory } from '../../../services/recipeService';
import { useService } from '../../../hooks/useService';

import RecipeCardLink from '../../RecipeCardLink/RecipeCardLink';

import styles from './RecipesList.module.css';

import { useNavigate } from 'react-router-dom';

const RecipesList = ({ recipeType, searchQuery }) => {
    const [recipes, setRecipes] = useState([]);

    const recipeService = useService(recipeServiceFactory);

    const navigate = useNavigate();

    useEffect(() => {
        switch (recipeType) {
            case 'all':
                recipeService.getAllUserRecipes(searchQuery)
                    .then(res => setRecipes(res.result))
                    .catch(error => console.log(error));
                break;
            case 'approved':
                recipeService.getApprovedUserRecipes(searchQuery)
                    .then(res => setRecipes(res.result))
                    .catch(error => console.log(error));
                break;
            case 'unapproved':
                recipeService.getUnapprovedUserRecipes(searchQuery)
                    .then(res => setRecipes(res.result))
                    .catch(error => console.log(error));
                break;
            default:

                navigate('/recipe/user-recipes/all');
                recipeService.getAllUserRecipes(searchQuery)
                    .then(res => setRecipes(res.result))
                    .catch(error => console.log(error));
                break;
        }
    }, [recipeType, searchQuery]);

    return (
        <>
            <div className={styles.container}>
                {recipes.map(x => <RecipeCardLink
                    key={x._id}
                    recipe={x}
                    link={`/recipe/details/${x._id}`} />
                )}
            </div>
        </>
    );
};

export default RecipesList;