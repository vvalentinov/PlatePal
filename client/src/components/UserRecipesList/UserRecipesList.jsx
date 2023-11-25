import styles from './UserRecipesList.module.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import RecipesList from './RecipesList/RecipesList';
import ToastNotification from '../Toast/ToastNotification';
import BackToTopArrow from '../BackToTopArrow/BackToTopArrow';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';

import { extractTitle } from '../../utils/extractInitialTitle';
import { recipeNameValidator } from '../../utils/validatorUtil';
import useForm from '../../hooks/useForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faList, faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const UserRecipesList = () => {
    const { recipeType } = useParams();

    const [recipeNameErr, setRecipeNameErr] = useState('');
    const [toast, setToast] = useState('');

    const title = extractTitle(recipeType);

    const [searchParams, setSearchParams] = useSearchParams();

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

    const handleToast = (message) => setToast(message);

    const {
        formValues,
        updateSearchQuery,
        onChangeHandler,
        onSubmit
    } = useForm({ 'search': '' }, onSearchFormSubmit);

    useEffect(() => {
        if (searchName) {
            updateSearchQuery(searchName);
        } else {
            searchParams.delete('search');
            setSearchParams(searchParams);
        }

        if (isNaN(pageNumber) || !pageNumber) {
            setSearchParams({ page: 1 });
        }

    }, [recipeType]);

    const onBtnClick = () => {
        setSearchParams({ page: searchParams.get('page') });
        setRecipeNameErr('');
    };

    return (
        <>
            {toast && <ToastNotification
                onExited={() => setToast('')}
                message={toast}
                isSuccessfull={false} />}
            <div className={styles.buttonsContainer}>
                <Link className={styles.link} to='/recipes/user-recipes/approved'>
                    <Button
                        onClick={onBtnClick}
                        bsPrefix={
                            recipeType === 'approved' ?
                                styles.activeButton :
                                styles.button}
                        size='lg'>
                        <FontAwesomeIcon className='me-1' icon={faCircleCheck} />
                        Approved Recipes
                    </Button>
                </Link>
                <Link className={styles.link} to='/recipes/user-recipes/unapproved'>
                    <Button
                        onClick={onBtnClick}
                        bsPrefix={
                            recipeType === 'unapproved' ?
                                styles.activeButton :
                                styles.button}
                        size='lg'>
                        <FontAwesomeIcon className='me-1' icon={faCircleXmark} />
                        Unapproved Recipes
                    </Button>
                </Link>
                <Link className={styles.link} to='/recipes/user-recipes/all'>
                    <Button
                        onClick={onBtnClick}
                        bsPrefix={
                            recipeType === 'all' ?
                                styles.activeButton :
                                styles.button}
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
                        <Button type='submit' bsPrefix={styles.searchBtn} id="button-addon2">
                            <FontAwesomeIcon size='lg' icon={faMagnifyingGlass} />
                        </Button>
                    </InputGroup>
                    {recipeNameErr && <p className='text-start text-danger'>{recipeNameErr}</p>}
                </Form>
            </div>
            <h2 className='text-center'>{title}</h2>
            <RecipesList
                setCurrentPage={(number) => setSearchParams(
                    {
                        search: searchName ? searchName : '',
                        page: number
                    })}
                currentPage={pageNumber}
                handleToast={handleToast}
                recipeType={recipeType}
                searchQuery={searchName ? searchName : ''} />
            <BackToTopArrow />
        </>
    );
};

export default UserRecipesList;