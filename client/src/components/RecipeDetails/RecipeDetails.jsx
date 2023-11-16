import styles from './RecipeDetails.module.css';

import ApproveRecipe from './ApproveRecipe/ApproveRecipe';
import RecipeDescriptionCard from './RecipeDescription/RecipeDescriptionCard';
import RecipeIngredientsContainer from './RecipeIngredients/RecipeIngredientsContainer';
import RecipeStepsContainer from './RecipeSteps/RecipeStepsContainer';
import RecipeStarRating from './RecipeStarRating/RecipeStarRating';
import RecipeCommentsList from './RecipeCommentsList/RecipeCommentsList';
import BackToTopArrow from '../BackToTopArrow/BackToTopArrow';
import ToastNotification from '../Toast/ToastNotification';
import CustomSpinner from '../Spinner/Spinner';

import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

import { recipeServiceFactory } from '../../services/recipeService';

import { useService } from '../../hooks/useService';

const RecipeDetails = () => {
    const [isSpinnerLoading, setIsSpinnerLoading] = useState(true);
    const [toastMessage, setToastMessage] = useState('');
    const [recipe, setRecipe] = useState();

    const { isAuthenticated, isAdmin } = useContext(AuthContext);

    const { recipeId } = useParams();

    const recipeService = useService(recipeServiceFactory);

    useEffect(() => {
        recipeService.getRecipe(recipeId)
            .then(res => setRecipe(res.result))
            .catch(error => setToastMessage(error.message))
            .finally(() => setIsSpinnerLoading(false));
    }, [recipeId]);

    const handleRatingSubmit = (result) => setRecipe((state) =>
    ({
        ...state,
        averageRating: result.averageRating,
        userRating: result.rateValue
    }));

    const handleApprovingRecipe = (result) => setRecipe((state) =>
        ({ ...state, isApproved: result.isApproved }));

    return (
        <>
            {isSpinnerLoading && <CustomSpinner />}
            {toastMessage && <ToastNotification message={toastMessage} />}
            {recipe && (
                <>
                    <div className={styles.container}>
                        <img src={recipe.image.url} alt={`Recipe Image: ${recipe.name}`} />
                        <RecipeDescriptionCard {...recipe} />
                    </div>
                    <div className={styles.recipeCommentStarContainer}>
                        {
                            !recipe.isApproved && isAdmin &&
                            <ApproveRecipe
                                recipeId={recipeId}
                                handleApprovingRecipe={handleApprovingRecipe} />
                        }
                        {isAuthenticated && (
                            <RecipeStarRating
                                recipeId={recipeId}
                                onRatingSubmit={handleRatingSubmit}
                                userRating={recipe.userRating} />
                        )}
                    </div>
                    <div className={styles.youtubeVideoSection}>
                        {recipe.youtubeLink && <iframe src={recipe.youtubeLink} allowFullScreen></iframe>}
                    </div>
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