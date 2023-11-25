import styles from './Recipes.module.css';

import PaginationComponent from '../Pagination/Pagination';

import RecipeCardLink from '../RecipeCardLink/RecipeCardLink';
import NoRecipesCard from './NoRecipesCard/NoRecipesCard';
import BackToTopArrow from '../BackToTopArrow/BackToTopArrow';

import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

import { recipeServiceFactory } from '../../services/recipeService';
import { useService } from '../../hooks/useService';
import { categoriesListPath } from '../../constants/pathNames';

const Recipes = () => {
    const recipeService = useService(recipeServiceFactory);

    const [searchParams, setSearchParams] = useSearchParams();
    const { category } = useParams();
    const navigate = useNavigate();

    const [recipes, setRecipes] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const pageNumber = parseInt(searchParams.get('page'));

    useEffect(() => {
        if ((isNaN(pageNumber) || !pageNumber) && totalPages > 1) {
            setSearchParams({ page: 1 });
        }

        recipeService.getAllInCategory(category, pageNumber)
            .then(res => {
                setRecipes(res.result);
                setTotalPages(res.totalPages);
            })
            .catch(error => {
                const state = { toastMsg: error.message, isSuccessfull: false };
                navigate(categoriesListPath, { state });
            });
    }, [category, pageNumber, totalPages]);

    return (
        <>
            {recipes.length > 0 ? (
                <div className={styles.recipesContainer}>
                    {recipes.map(recipe => <RecipeCardLink
                        key={recipe._id}
                        recipe={recipe}
                        link={`/recipe/details/${recipe._id}`} />
                    )}
                </div>
            ) : (
                <div className={styles.noRecipesContainer}>
                    <h3>No Recipes in {category} category Yet</h3>
                    <NoRecipesCard />
                </div>
            )}

            {totalPages > 1 && (
                <div className={styles.paginationContainer}>
                    <PaginationComponent
                        pagesCount={totalPages}
                        currentPage={parseInt(searchParams.get('page'))}
                        setCurrentPage={(number) => setSearchParams({ page: number })}
                    />
                </div>
            )}
            <BackToTopArrow />
        </>
    );
};

export default Recipes;