import styles from './RecipesInCategory.module.css';

import Button from 'react-bootstrap/Button';

import NoRecipesCard from './NoRecipesCard/NoRecipesCard';
import BackToTopArrow from '../BackToTopArrow/BackToTopArrow';
import PaginationComponent from '../Pagination/Pagination';
import RecipesSection from '../RecipesSection/RecipesSection';
import SearchRecipeForm from '../SearchRecipeForm/SearchRecipeForm';

import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

import { recipeServiceFactory } from '../../services/recipeService';
import { useService } from '../../hooks/useService';
import { categoriesListPath } from '../../constants/pathNames';
import { recipeNameValidator } from '../../utils/validatorUtil';

const FilterBtnsKeys = {
    ByAvgScoreDesc: 'ByAvgScoreDesc',
    ByDateAsc: 'ByDateAsc',
    ByDateDesc: 'ByDateDesc'
};

const RecipesInCategory = () => {
    const recipeService = useService(recipeServiceFactory);

    const navigate = useNavigate();
    const { category } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const [recipes, setRecipes] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentBtn, setCurrentBtn] = useState(FilterBtnsKeys.ByDateDesc);

    const searchName = searchParams.get('search') || '';
    let pageNumber = parseInt(searchParams.get('page'));

    if (!pageNumber || isNaN(pageNumber) || pageNumber < 1) {
        pageNumber = 1;
    }

    const searchInputText = `Search recipe by name in ${category} category`;

    useEffect(() => {
        recipeService.getAllInCategory(category, pageNumber, searchName, currentBtn)
            .then(res => {
                setRecipes(res.result);
                setTotalPages(res.totalPages);
            })
            .catch(error => {
                const state = { toastMsg: error.message, isSuccessfull: false };
                navigate(categoriesListPath, { state });
            });

        window.scrollTo(0, 0);

    }, [category, pageNumber, searchName, currentBtn]);

    const setCurrentPage = (number) => setSearchParams({ search: searchName, page: number });

    const onGetCommentsBtnClick = (type) => {
        setCurrentBtn(type);
        setSearchParams({ search: searchName, page: 1 });
    };

    return (
        <section className={styles.recipesInCategorySection}>
            <h2 className={styles.heading}>{category}</h2>
            {(recipes.length > 0 || (recipes.length === 0 && searchName)) && (
                <SearchRecipeForm searchInputText={searchInputText} validator={recipeNameValidator} />
            )}
            {recipes.length > 0 && (
                <div className={styles.container}>
                    <Button
                        bsPrefix={
                            currentBtn === FilterBtnsKeys.ByDateAsc ?
                                styles.sortFilterCommentsBtnActive :
                                styles.sortFilterCommentsBtn
                        }
                        onClick={() => onGetCommentsBtnClick(FilterBtnsKeys.ByDateAsc)}>
                        Sort from oldest to newest
                    </Button>
                    <Button
                        bsPrefix={
                            currentBtn === FilterBtnsKeys.ByDateDesc ?
                                styles.sortFilterCommentsBtnActive :
                                styles.sortFilterCommentsBtn
                        }
                        onClick={() => onGetCommentsBtnClick(FilterBtnsKeys.ByDateDesc)}>
                        Sort from newest to oldest
                    </Button>

                    <Button
                        bsPrefix={
                            currentBtn === FilterBtnsKeys.ByAvgScoreDesc ?
                                styles.sortFilterCommentsBtnActive :
                                styles.sortFilterCommentsBtn
                        }
                        onClick={() => onGetCommentsBtnClick(FilterBtnsKeys.ByAvgScoreDesc)}>
                        Sort By Avg Score Desc
                    </Button>

                </div>
            )}
            {recipes.length > 0 && (<RecipesSection recipes={recipes} />)}
            {recipes.length === 0 && !searchName && (
                <div className={styles.noRecipesContainer}>
                    <h3>No Recipes in {category} category Yet</h3>
                    <NoRecipesCard />
                </div>
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
        </section>
    );
};

export default RecipesInCategory;