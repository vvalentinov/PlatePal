import styles from './RecipeDescriptionCard.module.css';

import Card from 'react-bootstrap/Card';

import { AuthContext } from '../../../contexts/AuthContext';

import { useContext } from 'react';

import { Link } from 'react-router-dom';

import { HashLink } from 'react-router-hash-link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faNewspaper,
    faStar,
    faUser,
    faRectangleList,
    faComment,
    faHeart as faHeartSolid
} from '@fortawesome/free-solid-svg-icons';

import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';

const RecipeDescriptionCard = ({
    _id,
    name,
    owner,
    description,
    category,
    averageRating,
    userRating,
    ratings,
    isRecipeOwner,
    handleAddRecipeToFavourites,
    isAdded,
    recipeId
}) => {
    const { isAuthenticated, token } = useContext(AuthContext);

    const onHeartClick = () => {
        fetch(`http://localhost:3000/user/add-recipe-to-favourites/${recipeId}`,
            {
                method: 'PUT',
                headers: { 'X-Authorization': token }
            })
            .then(res => res.json())
            .then(res => handleAddRecipeToFavourites(res.result))
            .catch(error => console.log(error.message));
    };

    return (
        <Card className={styles.recipeCard}>
            <Card.Header className={styles.recipeCardHeader}>
                {name} - <span className={styles.recipeOwnerSpan}>uploaded by {owner.username}</span>
            </Card.Header>
            <Card.Body className={styles.recipeCardBody}>
                <Card.Title>
                    <FontAwesomeIcon size='lg' icon={faNewspaper} className='me-2' />
                    Recipe Description:
                </Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
                <Card.Title>
                    <FontAwesomeIcon
                        onClick={onHeartClick}
                        size='lg'
                        icon={isAdded ? faHeartSolid : faRegularHeart}
                        className={isAdded ? styles.heartIconRed : styles.heartIcon} />
                    Add Recipe to Favourites
                </Card.Title>
                <Card.Title>
                    <FontAwesomeIcon size='lg' icon={faRectangleList} className='me-2' />
                    Category: <Link className={styles.categoryLink} to={`/recipe/all/${category.name}`}>{category.name}</Link>
                </Card.Title>
                <Card.Title>
                    <FontAwesomeIcon icon={faStar} className='me-2' size='lg' />
                    Recipe Average Rating: {averageRating} / 5.0 - (Total votes: {ratings.length})
                </Card.Title>
                {isAuthenticated && !isRecipeOwner && (
                    <Card.Title>
                        <FontAwesomeIcon size='lg' icon={faUser} className='me-2' />
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