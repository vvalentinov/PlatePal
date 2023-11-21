import styles from './RecipeDescriptionCard.module.css';

import Card from 'react-bootstrap/Card';

import { AuthContext } from '../../../contexts/AuthContext';

import { useContext } from 'react';

import { Link } from 'react-router-dom';

import { HashLink } from 'react-router-hash-link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faClock,
    faNewspaper,
    faStar,
    faUser,
    faRectangleList,
    faComment
} from '@fortawesome/free-solid-svg-icons';

const RecipeDescriptionCard = ({
    _id,
    name,
    owner,
    description,
    cookingTime,
    category,
    averageRating,
    userRating,
    ratings
}) => {
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <Card className={styles.recipeCard}>
            <Card.Header className={styles.recipeCardHeader}>
                {name} - <span className={styles.recipeOwnerSpan}>uploaded by {owner.username}</span>
            </Card.Header>
            <Card.Body className={styles.recipeCardBody}>
                <Card.Title><FontAwesomeIcon icon={faNewspaper} className='me-2' />Recipe Description:</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
                <Card.Title>
                    <FontAwesomeIcon icon={faRectangleList} className='me-2' />
                    Category: <Link className={styles.categoryLink} to={`/recipe/all/${category.name}`}>{category.name}</Link>
                </Card.Title>
                <Card.Title>
                    <FontAwesomeIcon icon={faClock} className='me-2' />Recipe Cooking Time: {cookingTime} minutes
                </Card.Title>
                <Card.Title>
                    <FontAwesomeIcon icon={faStar} className='me-2' />
                    Recipe Average Rating: {averageRating} / 5.0 - (Total votes: {ratings.length})
                </Card.Title>
                {isAuthenticated && (
                    <Card.Title>
                        <FontAwesomeIcon icon={faUser} className='me-2' />
                        {userRating === 0 ?
                            'You haven\'t rated this recipe yet!' :
                            <>
                                Your star rating: {[...Array(userRating)].map((star, index) =>
                                    <FontAwesomeIcon
                                        className={styles.icon}
                                        key={index}
                                        icon={faStar} />
                                )}
                            </>
                        }
                    </Card.Title>
                )}
                <Card.Title>
                    <HashLink
                        className={styles.commentsLink}
                        smooth
                        to={`/recipe/details/${_id}#comments`}>
                        Go to Comments<FontAwesomeIcon className='ms-2' icon={faComment} />
                    </HashLink>
                </Card.Title>
            </Card.Body>
        </Card>
    );
};

export default RecipeDescriptionCard;