import styles from './RecipeDescriptionCard.module.css';

import Card from 'react-bootstrap/Card';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faNewspaper, faComments } from '@fortawesome/free-solid-svg-icons';

const RecipeDescriptionCard = ({
    recipeName,
    ownerUsername,
    recipeDescription,
    recipeCookingTime,
    comments,
}) => {
    return (
        <Card className={styles.recipeCard}>
            <Card.Header className={styles.recipeCardHeader}>
                {recipeName} - uploaded by {ownerUsername}
            </Card.Header>
            <Card.Body className={styles.recipeCardBody}>
                <Card.Title><FontAwesomeIcon icon={faNewspaper} className='me-2' />Recipe Description:</Card.Title>
                <Card.Text>
                    {recipeDescription}
                </Card.Text>
                <Card.Title>
                    <FontAwesomeIcon icon={faClock} className='me-2' />Recipe Cooking Time: {recipeCookingTime} minutes
                </Card.Title>
                <Card.Title>
                    <FontAwesomeIcon icon={faComments} className='me-2' />Comments: {comments}
                </Card.Title>
            </Card.Body>
        </Card>
    );
};

export default RecipeDescriptionCard;