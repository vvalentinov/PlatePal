import styles from './UserRecipesList.module.css';

import { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import RecipesList from './RecipesList/RecipesList';

import { extractTitle } from '../../utils/extractInitialTitle';

const UserRecipesList = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const currentURL = location.pathname;

    const { recipeType } = useParams();

    const [title, setTitle] = useState(extractTitle(recipeType));
    const [searchName, setSearchName] = useState('');

    const [recipeTypeState, setRecipeTypeState] = useState(recipeType);
    const [searchQuery, setSearchQuery] = useState('');

    const onSearchNameChange = (e) => setSearchName(e.target.value);

    const searchInputText = `Search recipe by name in ${title.toLowerCase()}`;

    const getAllUserRecipes = () => {
        setTitle('All Recipes');
        setRecipeTypeState('all');
        setSearchQuery('');
    };

    useEffect(() => {
        setRecipeTypeState(recipeType);
    }, [recipeType]);

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

    const onSearchFormSubmit = (e) => {
        e.preventDefault();
        if (searchName) {
            navigate(`${currentURL}?search=${searchName}`);
        } else {
            navigate(`${currentURL}`);
        }
        setSearchQuery(searchName);
    };

    return (
        <>
            <div className={styles.buttonsContainer}>
                <Link className={styles.link} to='/recipe/user-recipes/approved'>
                    <Button onClick={getUserApprovedRecipes} bsPrefix={styles.button} size='lg'>Approved Recipes</Button>
                </Link>
                <Link className={styles.link} to='/recipe/user-recipes/unapproved'>
                    <Button onClick={getUserUnapprovedRecipes} bsPrefix={styles.button} size='lg'>Unapproved Recipes</Button>
                </Link>
                <Link className={styles.link} to='/recipe/user-recipes/all'>
                    <Button onClick={getAllUserRecipes} bsPrefix={styles.button} size='lg'>All Recipes</Button>
                </Link>
            </div>

            <div className={styles.searchContainer}>
                <Form onSubmit={onSearchFormSubmit} className={styles.searchForm}>
                    <InputGroup size='lg'>
                        <Form.Control
                            placeholder={`${searchInputText}`}
                            aria-label={`${searchInputText}`}
                            aria-describedby="basic-addon2"
                            className='border border-2 border-dark'
                            onChange={onSearchNameChange}
                            value={searchName}
                        />
                        <Button
                            type='submit'
                            className='border border-2 border-dark'
                            id="button-addon2">
                            Button
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