import styles from './RecipeIngredientsContainer.module.css';

import ListGroup from 'react-bootstrap/ListGroup';

const RecipeIngredientsContainer = ({ ingredients }) => {
    return (
        <div className={styles.recipeIngredientsContainer}>
            <h3>Recipe Ingredients</h3>
            <ListGroup className={styles.recipeIngredientsList} as="ol" numbered>
                {ingredients.map((x, index) =>
                    <ListGroup.Item key={index} as="li">{x}</ListGroup.Item>
                )}
            </ListGroup>
        </div>
    );
};

export default RecipeIngredientsContainer;