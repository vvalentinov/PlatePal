import styles from './RecipeStepsContainer.module.css';

import ListGroup from 'react-bootstrap/ListGroup';

const RecipeStepsContainer = ({ steps }) => {
    return (
        <div className={styles.recipeStepsContainer}>
            <h3>Recipe Steps</h3>
            <ListGroup className={styles.recipeStepsList} as="ol" numbered>
                {steps.map((x, index) =>
                    <ListGroup.Item key={index} as="li">{x}</ListGroup.Item>
                )}
            </ListGroup>
        </div>
    );
};

export default RecipeStepsContainer;