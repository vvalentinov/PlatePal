import styles from './UserProfile.module.css';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

import {
    manageUsersCardText,
    favoriteRecipesCardText,
    userRecipesCardText
} from '../../constants/cardTextMessages';

import BackToTopArrow from '../BackToTopArrow/BackToTopArrow';

const UserProfile = () => {
    const { isAdmin, username } = useContext(AuthContext);

    return (
        <>
            <h2 className='text-center mt-3'>My Profile</h2>
            <h3 className='text-center'>Username: {username}</h3>

            {isAdmin && (
                <div className={styles.container}>
                    <img src='/src/assets/images/manageUsers.jpg' alt="" />
                    <Card className={styles.card}>
                        <Card.Body>
                            <Card.Text>
                                {manageUsersCardText}
                            </Card.Text>
                            <Link to='/manage-users'>
                                <Button bsPrefix={styles.cardBtn}>
                                    Go To Manage Users
                                </Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </div>
            )}

            <div className={styles.container}>
                <img src='/src/assets/images/myRecipes.jpg' alt="" />
                <Card className={styles.card}>
                    <Card.Body>
                        <Card.Text>
                            {userRecipesCardText}
                        </Card.Text>
                        <Link to='/recipes/user-recipes/all'>
                            <Button bsPrefix={styles.cardBtn}>
                                Go To My Recipes
                            </Button>
                        </Link>
                    </Card.Body>
                </Card>
            </div>

            <div className={styles.container}>
                <img src='/src/assets/images/favoriteRecipes-min.jpg' alt="" />
                <Card className={styles.card}>
                    <Card.Body>
                        <Card.Text>
                            {favoriteRecipesCardText}
                        </Card.Text>
                        <Link to='/recipes/user-favourites'>
                            <Button bsPrefix={styles.cardBtn}>
                                Go To My Favourite Recipes
                            </Button>
                        </Link>

                    </Card.Body>
                </Card>
            </div>

            <BackToTopArrow />
        </>
    )
};

export default UserProfile;