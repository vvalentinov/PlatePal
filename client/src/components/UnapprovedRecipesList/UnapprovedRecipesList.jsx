import styles from './UnapprovedRecipesList.module.css';

import Spinner from '../Spinner/Spinner';

import BackToTopArrow from '../BackToTopArrow/BackToTopArrow';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useService } from '../../hooks/useService';
import { recipeServiceFactory } from '../../services/recipeService';

import ToastNotification from '../Toast/ToastNotification';
import RecipesSection from '../RecipesSection/RecipesSection';
import SearchRecipeForm from '../SearchRecipeForm/SearchRecipeForm';

import { recipeNameValidator } from '../../utils/validatorUtil';

import PaginationComponent from '../Pagination/Pagination';

const UnapprovedRecipesList = () => {
    const recipeService = useService(recipeServiceFactory);

    const [recipes, setRecipes] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [toastMsg, setToastMsg] = useState('');

    const [searchParams, setSearchParams] = useSearchParams();
    const searchName = searchParams.get('search') || '';
    let pageNumber = parseInt(searchParams.get('page'));

    if (!pageNumber || isNaN(pageNumber) || pageNumber < 1) {
        pageNumber = 1;
    }

    useEffect(() => {
        recipeService.getUnapprovedRecipes(pageNumber, searchName)
            .then(res => setRecipes(res.result))
            .catch(error => setToastMsg(error.message))
            .finally(() => {
                setIsLoading(false);
                window.scrollTo(0, 0);
            });
    }, []);

    const setCurrentPage = (number) => setSearchParams({ search: searchName, page: number });

    return (
        <>
            {toastMsg && <ToastNotification
                message={toastMsg}
                onExited={() => setToastMsg('')} />}
            {isLoading ? <Spinner /> : (
                <>
                    <h2 className='text-center text-white mt-4'>
                        Unapproved Recipes ({recipes.length})
                    </h2>
                    <SearchRecipeForm searchInputText='Search recipe by name...' validator={recipeNameValidator} />
                    <RecipesSection recipes={recipes} />
                </>
            )}
            {totalPages > 1 && (
                <div className={styles.paginationContainer}>
                    <PaginationComponent
                        pagesCount={totalPages}
                        currentPage={pageNumber}
                        setCurrentPage={(number) => setCurrentPage(number)}
                    />
                </div>
            )}
            <BackToTopArrow />
        </>
    );
};

export default UnapprovedRecipesList;