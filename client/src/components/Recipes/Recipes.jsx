import styles from './Recipes.module.css';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import RecipeCardLink from '../RecipeCardLink/RecipeCardLink';
import NoRecipesCard from './NoRecipesCard/NoRecipesCard';
import BackToTopArrow from '../BackToTopArrow/BackToTopArrow';
import PaginationComponent from '../Pagination/Pagination';

import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

import { recipeServiceFactory } from '../../services/recipeService';
import { useService } from '../../hooks/useService';
import { categoriesListPath } from '../../constants/pathNames';

import useForm from '../../hooks/useForm';

import { recipeNameValidator } from '../../utils/validatorUtil';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Recipes = () => {
    const recipeService = useService(recipeServiceFactory);

    const [searchParams, setSearchParams] = useSearchParams();
    const { category } = useParams();
    const navigate = useNavigate();

    const [recipes, setRecipes] = useState([]);
    const [recipeNameErr, setRecipeNameErr] = useState('');
    const [totalPages, setTotalPages] = useState(1);

    const searchName = searchParams.get('search') || '';
    let pageNumber = parseInt(searchParams.get('page') || '1');

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

        setSearchParams({ search: searchName, page: pageNumber });

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
        <>
            {(recipes.length > 0 || (recipes.length === 0 && searchName)) && (
                <div className={styles.searchContainer}>
                    <Form
                        onSubmit={onSubmit}
                        className={styles.searchForm}>
                        <InputGroup size='lg'>
                            <Form.Control
                                placeholder={`${searchInputText}`}
                                aria-label={`${searchInputText}`}
                                aria-describedby="basic-addon2"
                                className='border border-2 border-dark'
                                onChange={onChangeHandler}
                                value={formValues.search}
                                name='search'
                            />
                            <Button type='submit' bsPrefix={styles.searchBtn} id="button-addon2">
                                <FontAwesomeIcon size='lg' icon={faMagnifyingGlass} />
                            </Button>
                        </InputGroup>
                        {recipeNameErr && <p className='text-start text-danger'>{recipeNameErr}</p>}
                    </Form>
                </div>
            )}

            {recipes.length > 0 && (
                <div className={styles.recipesContainer}>
                    {recipes.map(recipe => <RecipeCardLink
                        key={recipe._id}
                        recipe={recipe}
                        link={`/recipe/details/${recipe._id}`} />
                    )}
                </div>
            )}

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
                        setCurrentPage={(number) => setSearchParams({
                            search: searchName ? searchName : '',
                            page: number
                        })}
                    />
                </div>
            )}

            <BackToTopArrow />
        </>
    );
};

export default Recipes;