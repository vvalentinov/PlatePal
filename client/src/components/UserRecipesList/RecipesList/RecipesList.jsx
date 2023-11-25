import styles from './RecipesList.module.css';

import Card from 'react-bootstrap/Card';

import RecipeCardLink from '../../RecipeCardLink/RecipeCardLink';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { recipeServiceFactory } from '../../../services/recipeService';
import { useService } from '../../../hooks/useService';
import { noSearchedRecipeFound } from '../../../constants/cardTextMessages';

import PaginationComponent from '../../Pagination/Pagination';

const RecipesList = ({
    recipeType,
    searchQuery,
    handleToast,
    currentPage,
    setCurrentPage
}) => {
    const [recipes, setRecipes] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const recipeService = useService(recipeServiceFactory);

    const navigate = useNavigate();

    useEffect(() => {
        switch (recipeType) {
            case 'all':
                recipeService.getAllUserRecipes(searchQuery, currentPage)
                    .then(res => {
                        setRecipes(res.result);
                        setTotalPages(res.totalPages);
                    })
                    .catch(error => handleToast(error.message));
                break;
            case 'approved':
                recipeService.getApprovedUserRecipes(searchQuery, currentPage)
                    .then(res => {
                        setRecipes(res.result);
                        setTotalPages(res.totalPages);
                    })
                    .catch(error => handleToast(error.message));
                break;
            case 'unapproved':
                recipeService.getUnapprovedUserRecipes(searchQuery)
                    .then(res => {
                        setRecipes(res.result);
                        setTotalPages(res.totalPages);
                    })
                    .catch(error => handleToast(error.message));
                break;
            default:
                recipeService.getAllUserRecipes(searchQuery, currentPage)
                    .then(res => {
                        setRecipes(res.result);
                        setTotalPages(res.totalPages);
                    })
                    .catch(error => handleToast(error.message))
                    .finally(() => navigate('/recipes/user-recipes/all'));
                break;
        }
    }, [recipeType, searchQuery, currentPage]);

    return (
        <>
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
            {totalPages > 1 && (
                <div className={styles.paginationContainer}>
                    <PaginationComponent
                        pagesCount={totalPages}
                        currentPage={currentPage}
                        setCurrentPage={(number) => setCurrentPage(number)} />
                </div>
            )}
        </>
    );
};

export default RecipesList;