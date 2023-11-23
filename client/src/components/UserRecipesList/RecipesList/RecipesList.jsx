import styles from './RecipesList.module.css';

import Card from 'react-bootstrap/Card';

import RecipeCardLink from '../../RecipeCardLink/RecipeCardLink';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { recipeServiceFactory } from '../../../services/recipeService';
import { useService } from '../../../hooks/useService';
import { noSearchedRecipeFound } from '../../../constants/cardTextMessages';

const RecipesList = ({ recipeType, searchQuery, handleToast }) => {
    const [recipes, setRecipes] = useState([]);

    const recipeService = useService(recipeServiceFactory);

    const navigate = useNavigate();

    useEffect(() => {
        switch (recipeType) {
            case 'all':
                recipeService.getAllUserRecipes(searchQuery)
                    .then(res => setRecipes(res.result))
                    .catch(error => handleToast(error.message));
                break;
            case 'approved':
                recipeService.getApprovedUserRecipes(searchQuery)
                    .then(res => setRecipes(res.result))
                    .catch(error => handleToast(error.message));
                break;
            case 'unapproved':
                recipeService.getUnapprovedUserRecipes(searchQuery)
                    .then(res => setRecipes(res.result))
                    .catch(error => handleToast(error.message));
                break;
            default:
                recipeService.getAllUserRecipes(searchQuery)
                    .then(res => setRecipes(res.result))
                    .catch(error => handleToast(error.message))
                    .finally(() => navigate('/recipes/user-recipes/all'));
                break;
        }
    }, [recipeType, searchQuery]);

    return (
        <div className={styles.container}>
            {recipes.length === 0 && searchQuery &&
                (
                    <Card className={styles.noRecipesCard}>
                        <Card.Header className={styles.noRecipesCardHeader}>
                            Uh-oh! No recipe found!
                        </Card.Header>
                        <Card.Body className={styles.noRecipesCardBody}>
                            <Card.Text>
                                {noSearchedRecipeFound}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )}
            {recipes.length === 0 && !searchQuery && <p className={styles.noRecipesMessage}>No Recipes Found!</p>}
            {recipes.length > 0 &&
                recipes.map(recipe => <RecipeCardLink
                    key={recipe._id}
                    recipe={recipe}
                    link={`/recipe/details/${recipe._id}`} />)
            }
        </div>
    );
};

export default RecipesList;