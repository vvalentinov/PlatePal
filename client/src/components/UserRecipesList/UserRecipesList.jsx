import styles from './UserRecipesList.module.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';

import PaginationComponent from '../Pagination/Pagination';
import ToastNotification from '../Toast/ToastNotification';
import BackToTopArrow from '../BackToTopArrow/BackToTopArrow';
import RecipeCardLink from '../RecipeCardLink/RecipeCardLink';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';

import { extractTitle } from '../../utils/extractInitialTitle';
import { recipeNameValidator } from '../../utils/validatorUtil';
import useForm from '../../hooks/useForm';

import { useService } from '../../hooks/useService';
import { recipeServiceFactory } from '../../services/recipeService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleCheck,
    faList,
    faCircleXmark,
    faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';

import { noSearchedRecipeFound } from '../../constants/cardTextMessages';

const UserRecipesList = () => {
    const navigate = useNavigate();
    const { recipeType } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const recipeService = useService(recipeServiceFactory);

    const [recipeNameErr, setRecipeNameErr] = useState('');
    const [toast, setToast] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const title = extractTitle(recipeType);

    const searchName = searchParams.get('search');
    const pageNumber = parseInt(searchParams.get('page'));

    const searchInputText = `Search recipe by name in ${title.toLowerCase()}`;

    const onSearchFormSubmit = () => {
        const recipeNameErrMsg = recipeNameValidator(formValues.search);
        if (recipeNameErrMsg) {
            setRecipeNameErr(recipeNameErrMsg);
            return;
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

    useEffect(() => {
        if (searchName) {
            updateSearchQuery(searchName);
        }
        // else {
        //     searchParams.delete('search');
        //     setSearchParams(searchParams);
        // }

        if (isNaN(pageNumber) || !pageNumber || pageNumber <= 0) {
            return setSearchParams({ page: 1 });
        }

        recipeService.getAllUserRecipes(searchName, pageNumber, recipeType)
            .then(res => {
                setRecipes(res.result);
                setTotalPages(res.totalPages);
            }).catch(error => setToast(error.message));

    }, [recipeType, searchParams]);

    return (
        <>
            {toast && <ToastNotification
                onExited={() => setToast('')}
                message={toast}
                isSuccessfull={false} />}
            <div className={styles.buttonsContainer}>
                <Button
                    className={styles.button}
                    onClick={() => {
                        setSearchParams({ page: searchParams.get('page') });
                        setRecipeNameErr('');
                        navigate('/recipes/user-recipes/approved');
                    }}
                    bsPrefix={
                        recipeType === 'approved' ?
                            styles.activeButton :
                            styles.button}
                    size='lg'>
                    <FontAwesomeIcon className='me-1' icon={faCircleCheck} />
                    Approved Recipes
                </Button>
                <Button
                    className={styles.button}
                    onClick={() => {
                        setSearchParams({ page: searchParams.get('page') });
                        setRecipeNameErr('');
                        navigate('/recipes/user-recipes/unapproved');
                    }}
                    bsPrefix={
                        recipeType === 'unapproved' ?
                            styles.activeButton :
                            styles.button}
                    size='lg'>
                    <FontAwesomeIcon className='me-1' icon={faCircleXmark} />
                    Unapproved Recipes
                </Button>
                <Button
                    className={styles.button}
                    onClick={() => {
                        setSearchParams({ page: searchParams.get('page') });
                        setRecipeNameErr('');
                        navigate('/recipes/user-recipes/all');
                    }}
                    bsPrefix={
                        recipeType === 'all' ?
                            styles.activeButton :
                            styles.button}
                    size='lg'>
                    <FontAwesomeIcon className='me-1' icon={faList} />
                    All Recipes
                </Button>
            </div>

            <div className={styles.searchContainer}>
                <Form onSubmit={onSubmit} className={styles.searchForm}>
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
            <h2 className='text-center'>{title}</h2>
            <div className={styles.container}>
                {recipes.length === 0 && searchName &&
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
                {recipes.length === 0 && !searchName && <p className={styles.noRecipesMessage}>No Recipes Found!</p>}
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
        </>
    );
};

export default UserRecipesList;