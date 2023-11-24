import styles from './RecipeDetails.module.css';

import ApproveRecipe from './ApproveRecipe/ApproveRecipe';
import DeleteRecipe from './DeleteRecipe/DeleteRecipe';
import EditRecipeCard from './EditRecipeCard/EditRecipeCard';
import RecipeDescriptionCard from './RecipeDescription/RecipeDescriptionCard';
import RecipeIngredientsContainer from './RecipeIngredients/RecipeIngredientsContainer';
import RecipeStepsContainer from './RecipeSteps/RecipeStepsContainer';
import RecipeStarRating from './RecipeStarRating/RecipeStarRating';
import RecipeCommentsList from './RecipeCommentsList/RecipeCommentsList';
import BackToTopArrow from '../BackToTopArrow/BackToTopArrow';
import ToastNotification from '../Toast/ToastNotification';
import CustomSpinner from '../Spinner/Spinner';

import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

import { recipeServiceFactory } from '../../services/recipeService';

import { useService } from '../../hooks/useService';

import * as cardTexts from '../../constants/cardTextMessages';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUtensils } from '@fortawesome/free-solid-svg-icons';

const RecipeDetails = () => {
    const { isAuthenticated, isAdmin, userId } = useContext(AuthContext);

    const navigate = useNavigate();
    const { recipeId } = useParams();

    const [isSpinnerLoading, setIsSpinnerLoading] = useState(true);
    const [recipe, setRecipe] = useState();
    const [isAdded, setIsAdded] = useState(false);
    const [errorToast, setErrorToast] = useState('');
    const [successToast, setSuccessToast] = useState('');

    const recipeService = useService(recipeServiceFactory);

    const isRecipeOwner = recipe && userId === recipe.owner._id;

    useEffect(() => {
        recipeService.getRecipe(recipeId)
            .then(res => {
                setRecipe(res.result);
                setIsAdded(res.result.isAdded);
            })
            .catch(error => setErrorToast(error.message))
            .finally(() => setIsSpinnerLoading(false));
    }, [recipeId]);

    const handleAddRecipeToFavourites = (result) => {
        setIsAdded(result);
        if (result) {
            setSuccessToast('Successfully added to favourites!');

        } else {
            setSuccessToast('Successfully removed from favourites!');
        }
    }

    const handleRatingRecipe = (result) => setRecipe((state) =>
    ({
        ...state,
        averageRating: result.averageRating,
        userRating: result.rateValue,
        ratings: result.ratings
    }));

    const handleApprovingRecipe = (result) => {
        setRecipe((state) => ({ ...state, isApproved: result.isApproved }));
    }

    const handleDeletingRecipe = (result) => {
        const toast = { toastMsg: result.message, isSuccessfull: true };
        navigate('/', { state: toast });
    };

    return (
        <>
            {isSpinnerLoading && <CustomSpinner />}
            {errorToast && <ToastNotification
                onExited={() => setErrorToast('')}
                message={errorToast} />}
            {successToast && <ToastNotification
                isSuccessfull={true}
                onExited={() => setSuccessToast('')}
                message={successToast} />}
            {recipe && (
                <>
                    <section className={styles.container}>
                        <img src={recipe.image.url} alt={`Recipe Image: ${recipe.name}`} />
                        <RecipeDescriptionCard
                            {...recipe}
                            isRecipeOwner={isRecipeOwner}
                            isAdded={isAdded}
                            recipeId={recipeId}
                            handleAddRecipeToFavourites={handleAddRecipeToFavourites} />
                    </section>

                    <section className={styles.recipePropertiesContainer}>
                        <div className={styles.recipeProperty}>
                            <span>
                                <FontAwesomeIcon icon={faClock} className='me-2' />
                                Prep Time: {recipe.prepTime} minutes
                            </span>
                        </div>
                        <div className={styles.recipeProperty}>
                            <span>
                                <FontAwesomeIcon icon={faClock} className='me-2' />
                                Cook Time: {recipe.cookingTime} minutes
                            </span>
                        </div>
                        <div className={styles.recipeProperty}>
                            <span>
                                <FontAwesomeIcon icon={faUtensils} className='me-2' />
                                Servings: {recipe.servings} servings
                            </span>
                        </div>
                    </section>

                    {isAuthenticated && (
                        <div className={styles.recipeCommentStarContainer}>
                            {
                                !recipe.isApproved && isAdmin &&
                                <ApproveRecipe
                                    showToast={(message, isSucc) =>
                                        isSucc ? setSuccessToast(message) : setErrorToast(message)}
                                    recipeId={recipeId}
                                    handleApprovingRecipe={handleApprovingRecipe} />
                            }
                            {
                                !isRecipeOwner &&
                                <RecipeStarRating
                                    recipeId={recipeId}
                                    onRatingSubmit={handleRatingRecipe}
                                    userRating={recipe.userRating} />
                            }

                            {
                                isRecipeOwner &&
                                <DeleteRecipe
                                    handleRecipeDelete={handleDeletingRecipe}
                                    text={cardTexts.userDeleteRecipeText}
                                    recipeId={recipeId}
                                />
                            }
                            {
                                isAdmin &&
                                !isRecipeOwner &&
                                <DeleteRecipe
                                    handleRecipeDelete={handleDeletingRecipe}
                                    text={cardTexts.adminDeleteRecipeText}
                                    recipeId={recipeId} />
                            }
                            {
                                isRecipeOwner && <EditRecipeCard recipeId={recipeId} />
                            }
                        </div>
                    )}

                    {recipe.youtubeLink !== 'undefined' && (
                        <div className={styles.youtubeVideoSection}>
                            <iframe src={recipe.youtubeLink} allowFullScreen></iframe>
                            <div><p>{cardTexts.youtubeVideoText}</p></div>
                        </div>
                    )}

                    <div className={styles.recipeInfoContainer}>
                        <RecipeIngredientsContainer ingredients={recipe.ingredients} />
                        <RecipeStepsContainer steps={recipe.steps} />
                    </div>
                    <section id='comments' className={styles.commentsSection}>
                        <RecipeCommentsList recipeId={recipeId} />
                    </section>
                    <BackToTopArrow />
                </>
            )}
        </>
    );
};

export default RecipeDetails;