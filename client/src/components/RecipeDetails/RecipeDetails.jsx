import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import styles from './RecipeDetails.module.css';

import RecipeDescriptionCard from './RecipeDescription/RecipeDescriptionCard';
import RecipeIngredientsContainer from './RecipeIngredients/RecipeIngredientsContainer';
import RecipeStepsContainer from './RecipeSteps/RecipeStepsContainer';
import RecipeComment from './RecipeComment/RecipeComment';
import RecipeStarRating from './RecipeStarRating/RecipeStarRating';
import BackToTopArrow from '../BackToTopArrow/BackToTopArrow';
import CustomSpinner from '../Spinner/Spinner';

import { AuthContext } from '../../contexts/AuthContext';
import NoCommentsCard from './NoCommentsCard/NoCommentsCard';

const RecipeDetails = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useContext(AuthContext);
    const { recipeId } = useParams();

    const [recipe, setRecipe] = useState();
    const [userRateValue, setUserRateValue] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:3000/recipe/details/${recipeId}`)
            .then(res => res.json())
            .then(res => setRecipe(res.result))
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false));

        fetch(`http://localhost:3000/rating/getRating/${recipeId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': token
                }
            })
            .then(res => res.json())
            .then(res => setUserRateValue(res.result))
            .catch(error => console.log(error));
    }, [recipeId, userRateValue]);

    const handleCommentSubmit = (newComment) => {
        setRecipe((state) => ({ ...state, comments: [...state.comments, newComment] }));
    };

    const handleRatingSubmit = (result) => {
        setRecipe((state) => ({ ...state, averageRating: result.averageRating }));
        setUserRateValue(result.rateValue);
    };

    return (
        <>
            {isLoading && <CustomSpinner />}
            {recipe && (
                <>
                    <div className={styles.container}>
                        <img src={recipe.image.url} alt={`Recipe Image: ${recipe.name}`} />
                        <RecipeDescriptionCard {...recipe} userRating={userRateValue} />
                    </div>
                    <div className={styles.recipeCommentStarContainer}>
                        <RecipeComment recipeId={recipeId} onCommentSubmit={handleCommentSubmit} />
                        <RecipeStarRating recipeId={recipeId} onRatingSubmit={handleRatingSubmit} />
                    </div>
                    <div className={styles.youtubeVideoSection}>
                        {recipe.youtubeLink && <iframe src={recipe.youtubeLink} allowFullScreen></iframe>}
                    </div>
                    <div className={styles.recipeInfoContainer}>
                        <RecipeIngredientsContainer ingredients={recipe.ingredients} />
                        <RecipeStepsContainer steps={recipe.steps} />
                    </div>
                    <section id='comments' className={styles.commentsSection}>
                        {recipe.comments.length > 0 ? (
                            <ul>
                                {recipe.comments.map(x => <li key={x._id}>{x.text}</li>)}
                            </ul>
                        ) : <NoCommentsCard />}
                    </section>
                    <BackToTopArrow />
                </>
            )}
        </>
    );
};

export default RecipeDetails;