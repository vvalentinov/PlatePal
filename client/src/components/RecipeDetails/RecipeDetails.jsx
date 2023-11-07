import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './RecipeDetails.module.css';

import RecipeDescriptionCard from './RecipeDescription/RecipeDescriptionCard';
import RecipeIngredientsContainer from './RecipeIngredients/RecipeIngredientsContainer';
import RecipeStepsContainer from './RecipeSteps/RecipeStepsContainer';
import RecipeComment from './RecipeComment/RecipeComment';
import BackToTopArrow from '../BackToTopArrow/BackToTopArrow';

import Card from 'react-bootstrap/Card';

const RecipeDetails = () => {
    const { recipeId } = useParams();

    const [recipe, setRecipe] = useState();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/recipe/details/${recipeId}`)
            .then(res => res.json())
            .then(res => setRecipe(res.result))
            .catch(error => console.log(error));

        fetch(`http://localhost:3000/comment/all/${recipeId}`)
            .then(res => res.json())
            .then(res => setComments(res.result))
            .catch(error => console.log(error));
    }, []);

    const handleCommentSubmit = (newComment) => setComments((state) => [...state, newComment]);

    return (
        <>
            {recipe && (
                <>
                    <div className={styles.container}>
                        <img src={recipe.image.url} alt={`Recipe Image: ${recipe.name}`} />
                        <RecipeDescriptionCard
                            recipeName={recipe.name}
                            ownerUsername={recipe.owner.username}
                            recipeDescription={recipe.description}
                            recipeCookingTime={recipe.cookingTime}
                            comments={comments.length} />
                    </div>
                    <RecipeComment recipeId={recipeId} onCommentSubmit={handleCommentSubmit} />
                    <div className={styles.recipeInfoContainer}>
                        <RecipeIngredientsContainer ingredients={recipe.ingredients} />
                        <RecipeStepsContainer steps={recipe.steps} />
                    </div>
                    <section id='comments' className={styles.commentsSection}>
                        {comments.length > 0 ? (
                            <ul>
                                {comments.map(x => <li key={x._id}>{x.text}</li>)}
                            </ul>
                        ) : (
                            <>
                                <h2>No Comments yet...</h2>
                                <Card className={styles.zeroCommentsCard}>
                                    <Card.Body>
                                        <Card.Text>
                                            Be the first to leave a comment and share your thoughts about this delicious recipe! Your feedback is valuable and can help others make the most of their culinary experience. Feel free to leave a comment and let us know your tips, variations, or any questions you may have. We're looking forward to hearing from you and building a vibrant cooking community around this wonderful recipe.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </>
                        )}
                    </section>
                    <BackToTopArrow />
                </>
            )}
        </>
    );
};

export default RecipeDetails;