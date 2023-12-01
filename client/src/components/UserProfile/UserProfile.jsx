import styles from './UserProfile.module.css';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

import {
    manageUsersCardText,
    favoriteRecipesCardText,
    userRecipesCardText,
    editUsernameCardText
} from '../../constants/cardTextMessages';

import { usernameValidator } from '../../utils/validatorUtil';

import BackToTopArrow from '../BackToTopArrow/BackToTopArrow';

import useForm from '../../hooks/useForm';

import { userServiceFactory } from '../../services/userService';
import { useService } from '../../hooks/useService';

import ToastNotification from '../Toast/ToastNotification';

const UserProfile = () => {
    const userService = useService(userServiceFactory);

    const { isAdmin, username, userLogin } = useContext(AuthContext);

    const [usernameErr, setUsernameErr] = useState('');
    const [toast, setToast] = useState(null);

    const onFormSubmit = async (data) => {
        const username = data.username;
        const usernameErr = usernameValidator(username);
        if (usernameErr) {
            return setUsernameErr(usernameErr);
        }

        try {
            const response = await userService.changeUsername({ newUsername: username });
            userLogin(response.result);
            setToast({ message: response.message, isSuccessfull: true });
            window.scrollTo(0, 0);
        } catch (error) {
            console.log(error.message);
        }
    };

    const {
        formValues,
        onChangeHandler,
        onSubmit
    } = useForm({ 'username': username }, onFormSubmit);

    const onUsernameBlur = () => setUsernameErr(usernameValidator(formValues.username));

    return (
        <>
            {toast && <ToastNotification onExited={() => setToast({})} message={toast.message} isSuccessfull={toast.isSuccessfull} />}
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
                        <Card.Text className={styles.cardText}>
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
                        <Card.Text className={styles.cardText}>
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

            <div className={styles.container}>
                <img src='/src/assets/images/login-register.jpg' alt="" />
                <Card className={styles.card}>
                    <Card.Body>
                        <Card.Text className={styles.cardText}>
                            {editUsernameCardText}
                        </Card.Text>
                        <Form onSubmit={onSubmit}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Username"
                                className="mb-3">
                                <Form.Control
                                    name='username'
                                    onChange={onChangeHandler}
                                    onBlur={onUsernameBlur}
                                    value={formValues.username}
                                    type="text"
                                    placeholder="Username..." />
                                {usernameErr && <p className='text-start text-danger'>{usernameErr}</p>}
                            </FloatingLabel>
                            <Button type='submit' bsPrefix={styles.cardBtn}>
                                Change Username
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>

            <BackToTopArrow />
        </>
    )
};

export default UserProfile;