import styles from './UserProfile.module.css';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import { userRecipesCardText } from '../../constants/cardTextMessages';

const UserProfile = () => {

    return (
        <div className={styles.container}>
            <h2>My Profile</h2>

            <Card className={styles.userRecipesCard}>
                <Card.Body>
                    <Card.Text>
                        {userRecipesCardText}
                    </Card.Text>
                    <Link to='/recipes/user-recipes/all'>
                        <Button bsPrefix={styles.userRecipesCardBtn}>
                            Go To My Recipes
                        </Button>
                    </Link>
                </Card.Body>
            </Card>

            <Card className={styles.userRecipesCard}>
                <Card.Body>
                    <Card.Text>
                        Welcome to your culinary haven! Explore the delightful world of flavors by diving into your curated collection of favorite recipes. This personalized list is a testament to your culinary journey, showcasing the dishes that have won a special place in your heart and kitchen. Click the link below to savor the memories and discover the magic behind each recipe. Happy cooking!
                    </Card.Text>
                    <Link to='/recipes/user-favourites'>
                        <Button bsPrefix={styles.userRecipesCardBtn}>
                            Go To My Favourite Recipes
                        </Button>
                    </Link>

                </Card.Body>
            </Card>
        </div>
    )
};

export default UserProfile;