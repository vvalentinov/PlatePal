import { useState, useEffect } from 'react';

import { recipeServiceFactory } from '../../../services/recipeService';
import { useService } from '../../../hooks/useService';

import RecipeCardLink from '../../RecipeCardLink/RecipeCardLink';

import styles from './RecipesList.module.css';

const RecipesList = ({ recipeType, title, searchQuery }) => {
    const [recipes, setRecipes] = useState([]);

    const recipeService = useService(recipeServiceFactory);

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
                recipeService.getAllUserRecipes(searchQuery)
                    .then(res => setRecipes(res.result))
                    .catch(error => console.log(error));
                break;
        }
    }, [recipeType, searchQuery]);

    return (
        <>
            <h2 className='text-center mt-3'>{title} ({recipes.length})</h2>
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