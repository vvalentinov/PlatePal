import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './RecipeDetails.module.css';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

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
                        <img src={recipe.image.url} alt="" />
                        <Card className={styles.recipeCard}>
                            <Card.Header className={styles.recipeCardHeader}>{recipe.name} - uploaded by {recipe.owner.username}</Card.Header>
                            <Card.Body className={styles.recipeCardBody}>
                                <Card.Title>Recipe Description:</Card.Title>
                                <Card.Text>
                                    {recipe.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className={styles.recipeInfoContainer}>
                        <div className={styles.recipeIngredientsContainer}>
                            <h3>Recipe Ingredients</h3>
                            <ListGroup className={styles.recipeIngredientsList} as="ol" numbered>
                                {recipe.ingredients.map((x, index) =>
                                    <ListGroup.Item key={index} as="li">{x}</ListGroup.Item>
                                )}
                            </ListGroup>
                        </div>

                        <div className={styles.recipeStepsContainer}>
                            <h3>Recipe Steps</h3>
                            <ListGroup className={styles.recipeStepsList} as="ol" numbered>
                                {recipe.steps.map((x, index) =>
                                    <ListGroup.Item key={index} as="li">{x}</ListGroup.Item>
                                )}
                            </ListGroup>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default RecipeDetails;