import styles from './Recipes.module.css';

import Pagination from 'react-bootstrap/Pagination';

import RecipeCardLink from '../RecipeCardLink/RecipeCardLink';
import NoRecipesCard from './NoRecipesCard/NoRecipesCard';

import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';

import { recipeServiceFactory } from '../../services/recipeService';
import { useService } from '../../hooks/useService';

import { categoriesListPath } from '../../constants/pathNames';

const Recipes = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { category } = useParams();
    const navigate = useNavigate();



    const [recipes, setRecipes] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const recipeService = useService(recipeServiceFactory);

    const pageNumber = parseInt(searchParams.get('page'));
    if (isNaN(pageNumber)) {
        setSearchParams({ page: 1 })
    }

    useEffect(() => {
        recipeService.getAllInCategory(category, pageNumber)
            .then(res => {
                setRecipes(res.result);
                setTotalPages(res.totalPages);
            })
            .catch(error => {
                const state = { toastMsg: error.message, isSuccessfull: false };
                navigate(categoriesListPath, { state });
            });
    }, [category, pageNumber]);

    let items = [];
    for (let number = 1; number <= totalPages; number++) {
        items.push(
            <Pagination.Item
                onClick={() => setSearchParams({ page: number })}
                key={number}
                active={number === parseInt(searchParams.get('page'))}>
                {number}
            </Pagination.Item>,
        );
    }

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
                    <Pagination size='lg'>
                        {/* <Pagination.First /> */}
                        <Pagination.Prev disabled={pageNumber === 1} onClick={() => setSearchParams({ page: pageNumber - 1 })} />
                        {items}
                        {/* <Pagination.Ellipsis /> */}

                        {/* <Pagination.Ellipsis /> */}
                        <Pagination.Next
                            onClick={() => setSearchParams({ page: pageNumber + 1 })}
                            disabled={pageNumber === totalPages} />
                        {/* <Pagination.Last /> */}
                    </Pagination>
                </div>
            )}

        </>
    );
};



export default Recipes;