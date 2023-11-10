import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import styles from './RecipeDetails.module.css';

import RecipeDescriptionCard from './RecipeDescription/RecipeDescriptionCard';
import RecipeIngredientsContainer from './RecipeIngredients/RecipeIngredientsContainer';
import RecipeStepsContainer from './RecipeSteps/RecipeStepsContainer';
import PostRecipeComment from './PostRecipeComment/PostRecipeComment';
import RecipeStarRating from './RecipeStarRating/RecipeStarRating';
import RecipeCommentsList from './RecipeCommentsList/RecipeCommentsList';
import BackToTopArrow from '../BackToTopArrow/BackToTopArrow';
import ToastNotification from '../Toast/ToastNotification';
import CustomSpinner from '../Spinner/Spinner';

import { AuthContext } from '../../contexts/AuthContext';
import NoCommentsCard from './NoCommentsCard/NoCommentsCard';

import { recipeServiceFactory } from '../../services/recipeService';

import { useService } from '../../hooks/useService';
import ApproveRecipe from './ApproveRecipe/ApproveRecipe';

const RecipeDetails = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [toast, setToast] = useState('');

    const { isAuthenticated, isAdmin } = useContext(AuthContext);

    const { recipeId } = useParams();

    const [recipe, setRecipe] = useState();

    const recipeService = useService(recipeServiceFactory);

    useEffect(() => {
        recipeService.getRecipe(recipeId)
            .then(res => setRecipe(res.result))
            .catch(error => setToast(error.message))
            .finally(() => setIsLoading(false));
    }, [recipeId]);

    const handleCommentSubmit = (newComment) => setRecipe((state) => ({ ...state, comments: [...state.comments, newComment] }));

    const handleRatingSubmit = (result) => {
        setRecipe((state) => ({
            ...state,
            averageRating: result.averageRating,
            userRating: result.rateValue
        }));
    };

    const handleApprovingRecipe = (result) => {
        setRecipe((state) => ({
            ...state,
            isApproved: result.isApproved
        }));
    };

    return (
        <>
            {isLoading && <CustomSpinner />}
            {toast && <ToastNotification message={toast} />}
            {recipe && (
                <>
                    <div className={styles.container}>
                        <img src={recipe.image.url} alt={`Recipe Image: ${recipe.name}`} />
                        <RecipeDescriptionCard {...recipe} />
                    </div>
                    <div className={styles.recipeCommentStarContainer}>
                        {!recipe.isApproved && isAdmin && <ApproveRecipe recipeId={recipeId} handleApprovingRecipe={handleApprovingRecipe} />}
                        {isAuthenticated && (
                            <>
                                <PostRecipeComment recipeId={recipeId} onCommentSubmit={handleCommentSubmit} />
                                <RecipeStarRating recipeId={recipeId} onRatingSubmit={handleRatingSubmit} />
                            </>
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
                        <h2>Comments:</h2>
                        {
                            recipe.comments.length > 0 ?
                                <RecipeCommentsList comments={recipe.comments} /> :
                                <NoCommentsCard />
                        }
                    </section>
                    <BackToTopArrow />
                </>
            )}
        </>
    );
};

export default RecipeDetails;