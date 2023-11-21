import styles from './RecipeDetails.module.css';

import ApproveRecipe from './ApproveRecipe/ApproveRecipe';
import DeleteRecipe from './DeleteRecipe/DeleteRecipe';
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

import {
    userDeleteRecipeText,
    adminDeleteRecipeText,
    youtubeVideoText
} from '../../constants/cardTextMessages';
import EditRecipeCard from './EditRecipeCard/EditRecipeCard';

const RecipeDetails = () => {
    const navigate = useNavigate();

    const [isSpinnerLoading, setIsSpinnerLoading] = useState(true);

    const [recipe, setRecipe] = useState();

    const [errorToast, setErrorToast] = useState('');
    const [successToast, setSuccessToast] = useState('');

    const { isAuthenticated, isAdmin, userId } = useContext(AuthContext);

    const { recipeId } = useParams();

    const recipeService = useService(recipeServiceFactory);

    const isRecipeOwner = recipe && userId === recipe.owner._id;

    useEffect(() => {
        recipeService.getRecipe(recipeId)
            .then(res => setRecipe(res.result))
            .catch(error => setErrorToast(error.message))
            .finally(() => setIsSpinnerLoading(false));
    }, [recipeId]);

    const handleRatingSubmit = (result) => setRecipe((state) =>
    ({
        ...state,
        averageRating: result.averageRating,
        userRating: result.rateValue,
        ratings: result.ratings
    }));

    const handleApprovingRecipe = (result) => {
        setRecipe((state) => ({ ...state, isApproved: result.isApproved }));
    }

    const handleRecipeDelete = (result) => {
        const toast = {
            toastMsg: result.message,
            isSuccessfull: true
        };

        navigate('/', { state: toast })
    }

    return (
        <>
            {isSpinnerLoading && <CustomSpinner />}
            {errorToast && <ToastNotification
                customFunc={() => setErrorToast('')}
                message={errorToast} />}
            {successToast && <ToastNotification
                isSuccessfull={true}
                customFunc={() => setSuccessToast('')}
                message={successToast} />}
            {recipe && (
                <>
                    <section className={styles.container}>
                        <img src={recipe.image.url} alt={`Recipe Image: ${recipe.name}`} />
                        <RecipeDescriptionCard {...recipe} />
                    </section>

                    {isAuthenticated && (
                        <div className={styles.recipeCommentStarContainer}>
                            {
                                !recipe.isApproved && isAdmin &&
                                <ApproveRecipe
                                    showToast={(message, isSucc) =>
                                        isSucc ? setSuccessToast(message) : setErrorToast(message)
                                    }
                                    recipeId={recipeId}
                                    handleApprovingRecipe={handleApprovingRecipe} />
                            }
                            <RecipeStarRating
                                recipeId={recipeId}
                                onRatingSubmit={handleRatingSubmit}
                                userRating={recipe.userRating} />
                            {
                                isRecipeOwner &&
                                <DeleteRecipe
                                    handleRecipeDelete={handleRecipeDelete}
                                    text={userDeleteRecipeText}
                                    recipeId={recipeId}
                                />
                            }
                            {
                                isAdmin &&
                                !isRecipeOwner &&
                                <DeleteRecipe
                                    handleRecipeDelete={handleRecipeDelete}
                                    text={adminDeleteRecipeText}
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
                            <div><p>{youtubeVideoText}</p></div>
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