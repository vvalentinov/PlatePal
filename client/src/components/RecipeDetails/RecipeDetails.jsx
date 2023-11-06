import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './RecipeDetails.module.css';

import RecipeDescriptionCard from './RecipeDescription/RecipeDescriptionCard';
import RecipeIngredientsContainer from './RecipeIngredients/RecipeIngredientsContainer';
import RecipeStepsContainer from './RecipeSteps/RecipeStepsContainer';

const RecipeDetails = () => {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState();

    useEffect(() => {
        fetch(`http://localhost:3000/recipe/details/${recipeId}`)
            .then(res => res.json())
            .then(res => setRecipe(res.result))
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            {recipe && (
                <>
                    <div className={styles.container}>
                        <img src={recipe.image.url} alt={`Recipe Image: ${recipe.name}`} />
                        <RecipeDescriptionCard
                            recipeName={recipe.name}
                            ownerUsername={recipe.owner.username}
                            recipeDescription={recipe.description} />
                    </div>
                    <div className={styles.recipeInfoContainer}>
                        <RecipeIngredientsContainer ingredients={recipe.ingredients} />
                        <RecipeStepsContainer steps={recipe.steps} />
                    </div>
                </>
            )}
        </>
    );
};

export default RecipeDetails;