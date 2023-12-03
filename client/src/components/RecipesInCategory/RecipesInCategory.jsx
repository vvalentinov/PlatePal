import styles from './RecipesInCategory.module.css';

import NoRecipesCard from './NoRecipesCard/NoRecipesCard';
import BackToTopArrow from '../BackToTopArrow/BackToTopArrow';
import PaginationComponent from '../Pagination/Pagination';
import RecipesSection from '../RecipesSection/RecipesSection';
import SearchRecipeForm from '../SearchRecipeForm/SearchRecipeForm';

import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

import { recipeServiceFactory } from '../../services/recipeService';
import { useService } from '../../hooks/useService';
import useForm from '../../hooks/useForm';
import { categoriesListPath } from '../../constants/pathNames';
import { recipeNameValidator } from '../../utils/validatorUtil';

const RecipesInCategory = () => {
    const recipeService = useService(recipeServiceFactory);

    const navigate = useNavigate();
    const { category } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const [recipes, setRecipes] = useState([]);
    const [recipeNameErr, setRecipeNameErr] = useState('');
    const [totalPages, setTotalPages] = useState(1);

    const searchName = searchParams.get('search') || '';
    let pageNumber = parseInt(searchParams.get('page'));

    if (!pageNumber || isNaN(pageNumber) || pageNumber < 1) {
        pageNumber = 1;
    }

    const onSearchFormSubmit = () => {
        const recipeNameErrMsg = recipeNameValidator(formValues.search);
        if (recipeNameErrMsg) {
            return setRecipeNameErr(recipeNameErrMsg);
        }

        setRecipeNameErr('');
        setSearchParams({ search: formValues.search, page: 1 });
    };

    const {
        formValues,
        updateSearchQuery,
        onChangeHandler,
        onSubmit
    } = useForm({ 'search': '' }, onSearchFormSubmit);

    const searchInputText = `Search recipe by name in ${category} category`;

    useEffect(() => {
        if (searchName) {
            updateSearchQuery(searchName);
        }

        recipeService.getAllInCategory(category, pageNumber, searchName)
            .then(res => {
                setRecipes(res.result);
                setTotalPages(res.totalPages);
            })
            .catch(error => {
                const state = { toastMsg: error.message, isSuccessfull: false };
                navigate(categoriesListPath, { state });
            });

    }, [category, pageNumber, searchName]);

    return (
        <section className={styles.recipesInCategorySection}>
            <h2 className={styles.heading}>{category}</h2>
            {(recipes.length > 0 || (recipes.length === 0 && searchName)) && (
                <SearchRecipeForm
                    onChange={onChangeHandler}
                    onSubmit={onSubmit}
                    value={formValues.search}
                    searchInputText={searchInputText}
                    error={recipeNameErr}
                />
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
                        setCurrentPage={(number) => {
                            if (searchName) {
                                setSearchParams({ search: searchName, page: number });
                            } else {
                                setSearchParams({ page: number });
                            }
                        }}
                    />
                </div>
            )}
            <BackToTopArrow />
        </section>
    );
};

export default RecipesInCategory;