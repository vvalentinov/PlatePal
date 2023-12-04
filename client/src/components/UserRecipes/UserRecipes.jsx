import styles from './UserRecipes.module.css';

import PaginationComponent from '../Pagination/Pagination';
import ToastNotification from '../Toast/ToastNotification';
import BackToTopArrow from '../BackToTopArrow/BackToTopArrow';
import SearchRecipeForm from '../../components/SearchRecipeForm/SearchRecipeForm';
import UserRecipesButton from './UserRecipesButton/UserRecipesButton';
import RecipesSection from '../RecipesSection/RecipesSection';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

import { extractTitle } from '../../utils/extractInitialTitleUtil';
import { recipeNameValidator } from '../../utils/validatorUtil';
import { useService } from '../../hooks/useService';
import { recipeServiceFactory } from '../../services/recipeService';

const UserRecipesList = () => {
    const navigate = useNavigate();
    const { recipeType } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const recipeService = useService(recipeServiceFactory);

    const [toast, setToast] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const title = extractTitle(recipeType);

    const searchName = searchParams.get('search') || '';
    const pageNumber = parseInt(searchParams.get('page'));

    const searchInputText = `Search recipe by name in ${title.toLowerCase()}`;

    useEffect(() => {
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
        navigate(`/recipes/user-recipes/${type}`);
    };

    const setCurrentPage = (number) => setSearchParams({ search: searchName, page: number });

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
            <SearchRecipeForm validator={recipeNameValidator} searchInputText={searchInputText} />
            <h2 className='text-center text-white'>{title}</h2>
            <div className={styles.container}>
                {
                    recipes.length === 0 &&
                    <p className={styles.noRecipesMessage}>No Recipes Found!</p>
                }
                {recipes.length > 0 && <RecipesSection recipes={recipes} />}
            </div>
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

export default UserRecipesList;