import styles from './RecipeDescriptionCard.module.css';

import Card from 'react-bootstrap/Card';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faClock,
    faNewspaper,
    faComments,
    faStar,
    faUser
} from '@fortawesome/free-solid-svg-icons';

const RecipeDescriptionCard = ({
    name,
    owner,
    description,
    cookingTime,
    comments,
    averageRating,
    userRating,
    ratings
}) => {
    return (
        <Card className={styles.recipeCard}>
            <Card.Header className={styles.recipeCardHeader}>
                {name} - uploaded by {owner.username}
            </Card.Header>
            <Card.Body className={styles.recipeCardBody}>
                <Card.Title><FontAwesomeIcon icon={faNewspaper} className='me-2' />Recipe Description:</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
                <Card.Title>
                    <FontAwesomeIcon icon={faClock} className='me-2' />Recipe Cooking Time: {cookingTime} minutes
                </Card.Title>
                <Card.Title>
                    <FontAwesomeIcon icon={faComments} className='me-2' />Comments: {comments.length}
                </Card.Title>
                <Card.Title>
                    <FontAwesomeIcon icon={faStar} className='me-2' />
                    Recipe Average Rating: {averageRating} - (Total votes: {ratings.length})
                </Card.Title>
                <Card.Title>
                    <FontAwesomeIcon icon={faUser} className='me-2' />
                    {userRating === 0 ?
                        'You haven\'t rated this recipe yet!' :
                        <>
                            Your star rating: {[...Array(userRating)].map((star, index) =>
                                <FontAwesomeIcon className={styles.icon} key={index} icon={faStar} />
                            )}
                        </>
                    }
                </Card.Title>
            </Card.Body>
        </Card>
    );
};

export default RecipeDescriptionCard;