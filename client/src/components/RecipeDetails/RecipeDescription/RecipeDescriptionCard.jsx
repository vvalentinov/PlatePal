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
    recipe,
    recipeId,
    isRecipeOwner,
    isFavourite,
    handleAddingRecipeToFavourites
}) => {
    const { isAuthenticated, token } = useContext(AuthContext);

    const onHeartClick = () => {
        if (isAuthenticated) {
            fetch(`http://localhost:3000/user/add-recipe-to-favourites/${recipeId}`,
                {
                    method: 'PUT',
                    headers: { 'X-Authorization': token }
                })
                .then(res => res.json())
                .then(res => handleAddingRecipeToFavourites(res.result))
                .catch(error => console.log(error.message));
        }
    };

    return (
        <Card className={styles.recipeCard}>
            <Card.Header className={styles.recipeCardHeader}>
                <span className={styles.recipeOwnerSpan}>
                    {recipe.name} - uploaded by {recipe.owner.username}
                </span>
            </Card.Header>
            <Card.Body className={styles.recipeCardBody}>
                <Card.Title>
                    <FontAwesomeIcon size='lg' icon={faNewspaper} className='me-2' />
                    Recipe Description:
                </Card.Title>
                <Card.Text>
                    {recipe.description}
                </Card.Text>
                <Card.Title>
                    <FontAwesomeIcon
                        onClick={onHeartClick}
                        size='lg'
                        icon={isFavourite ? faHeartSolid : faRegularHeart}
                        className={
                            isAuthenticated ?
                                (isFavourite ? styles.heartIconRed : styles.heartIcon) :
                                styles.headrtIconGuest} />
                    Add Recipe to Favourites
                </Card.Title>
                <Card.Title>
                    <FontAwesomeIcon size='lg' icon={faRectangleList} className='me-2' />
                    Category: <Link className={styles.categoryLink} to={`/recipe/all/${recipe.category.name}`}>{recipe.category.name}</Link>
                </Card.Title>
                <Card.Title>
                    <FontAwesomeIcon icon={faStar} className='me-2' size='lg' />
                    Recipe Average Rating: {recipe.averageRating} / 5.0 - (Total votes: {recipe.ratings.length})
                </Card.Title>
                {isAuthenticated && !isRecipeOwner && (
                    <Card.Title>
                        <FontAwesomeIcon size='lg' icon={faUser} className='me-2' />
                        {recipe.userRating === 0 ?
                            'You haven\'t rated this recipe yet!' :
                            <>
                                Your star rating: {[...Array(recipe.userRating)].map((star, index) =>
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
                        to={`/recipe/details/${recipe._id}#comments`}>
                        Go to Comments<FontAwesomeIcon className='ms-2' icon={faComment} />
                    </HashLink>
                </Card.Title>
            </Card.Body>
        </Card>
    );
};

export default RecipeDescriptionCard;