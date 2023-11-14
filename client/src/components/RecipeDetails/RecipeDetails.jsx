import styles from './RecipeDetails.module.css';

import ApproveRecipe from './ApproveRecipe/ApproveRecipe';
import RecipeDescriptionCard from './RecipeDescription/RecipeDescriptionCard';
import RecipeIngredientsContainer from './RecipeIngredients/RecipeIngredientsContainer';
import RecipeStepsContainer from './RecipeSteps/RecipeStepsContainer';
import PostRecipeComment from './PostRecipeComment/PostRecipeComment';
import RecipeStarRating from './RecipeStarRating/RecipeStarRating';
import RecipeCommentsList from './RecipeCommentsList/RecipeCommentsList';
import NoCommentsCard from './NoCommentsCard/NoCommentsCard';
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

    const handleCommentSubmit = (newComment) => setRecipe((state) =>
    ({
        ...state,
        comments: [...state.comments, newComment]
    }));

    const handleCommentEdit = (newComment, oldCommentId) => setRecipe((state) => {
        return {
            ...state,
            comments: state.comments.map(comment => {
                if (comment && comment._id === oldCommentId) {
                    return newComment;
                }
                return comment;
            })
        };
    });

    const handleCommentDelete = (commentId) => setRecipe((state) => ({
        ...state,
        comments: recipe.comments.filter(comment => comment._id !== commentId)
    }))

    const handleRatingSubmit = (result) => {
        setRecipe((state) => ({
            ...state,
            averageRating: result.averageRating,
            userRating: result.rateValue
        }));
    };

    const date = new Date();
    console.log(date);

    const handleApprovingRecipe = (result) => setRecipe((state) => ({ ...state, isApproved: result.isApproved }));

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
                            !recipe.isApproved &&
                            isAdmin &&
                            <ApproveRecipe recipeId={recipeId} handleApprovingRecipe={handleApprovingRecipe} />
                        }
                        {isAuthenticated && (
                            <>
                                <PostRecipeComment recipeId={recipeId} onCommentSubmit={handleCommentSubmit} />
                                <RecipeStarRating
                                    recipeId={recipeId}
                                    onRatingSubmit={handleRatingSubmit}
                                    userRating={recipe.userRating} />
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
                                <RecipeCommentsList
                                    comments={recipe.comments}
                                    handleCommentEdit={handleCommentEdit}
                                    handleCommentDelete={handleCommentDelete}
                                    recipeId={recipeId}
                                /> :
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