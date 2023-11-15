import styles from './UserRecipesList.module.css';

import { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import {
    useParams,
    useSearchParams,
    useNavigate,
    useLocation,
    Link
} from 'react-router-dom';

import RecipesList from './RecipesList/RecipesList';

import { extractTitle } from '../../utils/extractInitialTitle';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleCheck,
    faList,
    faCircleXmark,
    faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';

import useForm from '../../hooks/useForm';

const UserRecipesList = () => {
    const onSearchFormSubmit = () => {
        if (formValues.search) {
            navigate(`${currentURL}?search=${formValues.search}`);
        } else {
            navigate(`${currentURL}`);
        }
        setSearchQuery(formValues.search);
    };

    const {
        formValues,
        updateSearchQuery,
        onChangeHandler,
        onSubmit
    } = useForm({ 'search': '' }, onSearchFormSubmit);

    const navigate = useNavigate();

    const location = useLocation();
    const currentURL = location.pathname;

    const { recipeType } = useParams();

    const [searchParams, setSearchParams] = useSearchParams();

    const [title, setTitle] = useState(extractTitle(recipeType));

    const [recipeTypeState, setRecipeTypeState] = useState(recipeType);
    const [searchQuery, setSearchQuery] = useState('');

    const searchInputText = `Search recipe by name in ${title.toLowerCase()}`;

    useEffect(() => {
        const searchValue = searchParams.get('search');
        if (searchValue) {
            updateSearchQuery(searchValue);
            setSearchQuery(searchValue);
        } else {
            navigate(`/recipes/user-recipes/${recipeType}`);
        }
    }, [recipeType]);

    const getAllUserRecipes = () => {
        setTitle('All Recipes');
        setRecipeTypeState('all');
        setSearchQuery('');
    };

    const getUserApprovedRecipes = () => {
        setTitle('Approved Recipes');
        setRecipeTypeState('approved');
        setSearchQuery('');
    };

    const getUserUnapprovedRecipes = () => {
        setTitle('Unapproved Recipes');
        setRecipeTypeState('unapproved');
        setSearchQuery('');
    };

    return (
        <>
            <div className={styles.buttonsContainer}>
                <Link className={styles.link} to='/recipes/user-recipes/approved'>
                    <Button
                        onClick={getUserApprovedRecipes}
                        bsPrefix={styles.button}
                        size='lg'>
                        <FontAwesomeIcon className='me-1' icon={faCircleCheck} />
                        Approved Recipes
                    </Button>
                </Link>
                <Link className={styles.link} to='/recipes/user-recipes/unapproved'>
                    <Button
                        onClick={getUserUnapprovedRecipes}
                        bsPrefix={styles.button}
                        size='lg'>
                        <FontAwesomeIcon className='me-1' icon={faCircleXmark} />
                        Unapproved Recipes
                    </Button>
                </Link>
                <Link className={styles.link} to='/recipes/user-recipes/all'>
                    <Button
                        onClick={getAllUserRecipes}
                        bsPrefix={styles.button}
                        size='lg'>
                        <FontAwesomeIcon className='me-1' icon={faList} />
                        All Recipes
                    </Button>
                </Link>
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
                        <Button
                            type='submit'
                            bsPrefix={styles.searchBtn}
                            id="button-addon2">
                            <FontAwesomeIcon size='lg' icon={faMagnifyingGlass} />
                        </Button>
                    </InputGroup>
                </Form>
            </div>
            <h2 className='text-center'>{title}</h2>
            <RecipesList recipeType={recipeTypeState} searchQuery={searchQuery} />
        </>
    );
};

export default UserRecipesList;