import styles from './RecipeDescriptionCard.module.css';

import Card from 'react-bootstrap/Card';

const RecipeDescriptionCard = ({
    recipeName,
    ownerUsername,
    recipeDescription
}) => {
    return (
        <Card className={styles.recipeCard}>
            <Card.Header className={styles.recipeCardHeader}>
                {recipeName} - uploaded by {ownerUsername}
            </Card.Header>
            <Card.Body className={styles.recipeCardBody}>
                <Card.Title>Recipe Description:</Card.Title>
                <Card.Text>
                    {recipeDescription}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default RecipeDescriptionCard;