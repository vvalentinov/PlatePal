import styles from './UserProfile.module.css';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link, useNavigate } from 'react-router-dom';

import { userRecipesCardText } from '../../constants/cardTextMessages';

const UserProfile = () => {
    const navigate = useNavigate();

    const onUserRecipesBtnClick = () => navigate('/recipes/user-recipes/all');

    return (
        <div className={styles.container}>
            <h2>My Profile</h2>

            <Card className={styles.userRecipesCard}>
                <Card.Body>
                    <Card.Text>
                        {userRecipesCardText}
                    </Card.Text>
                    <Button bsPrefix={styles.userRecipesCardBtn} onClick={onUserRecipesBtnClick}>
                        Go To My Recipes
                    </Button>
                </Card.Body>
            </Card>
        </div>
    )
};

export default UserProfile;