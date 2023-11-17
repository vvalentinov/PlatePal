import { useState, useEffect } from 'react';

import { recipeServiceFactory } from '../../../services/recipeService';
import { useService } from '../../../hooks/useService';

import RecipeCardLink from '../../RecipeCardLink/RecipeCardLink';

import styles from './RecipesList.module.css';

import { useNavigate } from 'react-router-dom';

import Card from 'react-bootstrap/Card';

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
            {recipes.length === 0 && (
                <Card className={styles.noRecipesCard}>
                    <Card.Header className={styles.noRecipesCardHeader}>Uh-oh! No recipe found with name: {searchQuery}</Card.Header>
                    <Card.Body className={styles.noRecipesCardBody}>
                        <Card.Text>
                            It seems your culinary creativity has outpaced our recipe database. No worries, though! There are countless flavor combinations waiting to be discovered. Feel free to refine your search terms or browse through our diverse collection of recipes for fresh inspiration. If you've got a unique recipe up your sleeve, why not share it with the community? Your next culinary masterpiece could be the talk of the kitchen!
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
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