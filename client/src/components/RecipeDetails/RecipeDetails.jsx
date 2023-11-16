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
                    <section className={styles.container}>
                        <img src={recipe.image.url} alt={`Recipe Image: ${recipe.name}`} />
                        <RecipeDescriptionCard {...recipe} />
                    </section>

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

                    {recipe.youtubeLink && (
                        <div className={styles.youtubeVideoSection}>
                            <iframe src={recipe.youtubeLink} allowFullScreen></iframe>
                            <div>
                                <p>
                                    Experience the art of cooking in real-time! Dive into the heart of this delectable recipe with our exclusive YouTube video. Watch as expert chefs guide you through the intricate steps, sharing valuable tips and techniques that bring this culinary masterpiece to life. Immerse yourself in the sights and sounds of the kitchen, from the sizzle of the pan to the aromatic symphony of spices. This video is your backstage pass to culinary excellence, offering a visual feast that complements the detailed instructions. Enhance your cooking journey and embark on a flavorful adventure with our immersive YouTube experience. Hit play, and let the culinary magic unfold before your eyes!
                                </p>
                            </div>
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