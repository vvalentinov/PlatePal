import styles from './UserRecipes.module.css';

import PaginationComponent from '../Pagination/Pagination';
import ToastNotification from '../Toast/ToastNotification';
import BackToTopArrow from '../BackToTopArrow/BackToTopArrow';
import RecipeCardLink from '../RecipeCardLink/RecipeCardLink';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

import { extractTitle } from '../../utils/extractInitialTitleUtil';
import { recipeNameValidator } from '../../utils/validatorUtil';
import useForm from '../../hooks/useForm';

import { useService } from '../../hooks/useService';
import { recipeServiceFactory } from '../../services/recipeService';

import SearchRecipeForm from '../../components/SearchRecipeForm/SearchRecipeForm';
import UserRecipesButton from './UserRecipesButton/UserRecipesButton';

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

    const searchName = searchParams.get('search') || '';
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

        if (isNaN(pageNumber) || !pageNumber || pageNumber <= 0) {
            return setSearchParams({ page: 1 });
        }

        recipeService.getAllUserRecipes(searchName, pageNumber, recipeType)
            .then(res => {
                setRecipes(res.result);
                setTotalPages(res.totalPages);
            }).catch(error => setToast(error.message));

    }, [recipeType, searchParams]);

    const onBtnClick = (type) => {
        setSearchParams({ page: searchParams.get('page') });
        setRecipeNameErr('');
        navigate(`/recipes/user-recipes/${type}`);
    };

    return (
        <section>
            {toast && <ToastNotification
                onExited={() => setToast('')}
                message={toast}
                isSuccessfull={false} />}
            <div className={styles.buttonsContainer}>
                <UserRecipesButton onClick={onBtnClick} recipeType={recipeType} btnType='approved' />
                <UserRecipesButton onClick={onBtnClick} recipeType={recipeType} btnType='unapproved' />
                <UserRecipesButton onClick={onBtnClick} recipeType={recipeType} btnType='all' />
            </div>
            <SearchRecipeForm
                onSubmit={onSubmit}
                onChange={onChangeHandler}
                value={formValues.search}
                error={recipeNameErr}
                searchInputText={searchInputText}
            />
            <h2 className='text-center text-white'>{title}</h2>
            <div className={styles.container}>
                {
                    recipes.length === 0 &&
                    <p className={styles.noRecipesMessage}>No Recipes Found!</p>
                }
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
        </section>
    );
};

export default UserRecipesList;