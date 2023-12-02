import styles from './UserProfile.module.css';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

import {
    manageUsersCardText,
    favoriteRecipesCardText,
    userRecipesCardText,
    editUsernameCardText,
    changePasswordCardText
} from '../../constants/cardTextMessages';

import { usernameValidator, oldPassValidator, newPassValidator } from '../../utils/validatorUtil';

import BackToTopArrow from '../BackToTopArrow/BackToTopArrow';

import useForm from '../../hooks/useForm';

import { userServiceFactory } from '../../services/userService';
import { useService } from '../../hooks/useService';

import ToastNotification from '../Toast/ToastNotification';

import { userFavoriteRecipesPath, userRecipesPath, manageUsersPath } from '../../constants/pathNames';

const UserProfile = () => {
    const userService = useService(userServiceFactory);

    const { isAdmin, username, userLogin } = useContext(AuthContext);

    const [usernameErr, setUsernameErr] = useState('');
    const [oldPassErr, setOldPassErr] = useState('');
    const [newPassErr, setNewPassErr] = useState('');
    const [toast, setToast] = useState({ message: '', isSuccessfull: true });

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

    const onChangePassFormSubmit = async (data) => {
        const oldPassErrorMsg = oldPassValidator(data.oldPassword);
        const newPassErrorMsg = newPassValidator(data.newPassword);
        if (oldPassErrorMsg || newPassErrorMsg) {
            setOldPassErr(oldPassErrorMsg);
            setNewPassErr(newPassErrorMsg);
            return;
        }

        setOldPassErr('');
        setNewPassErr('');

        try {
            const response = await userService.changePassword({
                oldPassword: data.oldPassword,
                newPassword: data.newPassword
            });
            changePassFormValues.oldPassword = '';
            changePassFormValues.newPassword = '';
            setToast({ message: response.message, isSuccessfull: true });
            window.scrollTo(0, 0);
        } catch (error) {
            setToast({ message: error.message, isSuccessfull: false });
            window.scrollTo(0, 0);
        }
    };

    const {
        formValues,
        onChangeHandler,
        onSubmit
    } = useForm({ 'username': username }, onFormSubmit);

    const {
        formValues: changePassFormValues,
        onChangeHandler: changePassChangeHandler,
        onSubmit: changePassOnSubmit
    } = useForm({
        'oldPassword': '',
        'newPassword': ''
    }, onChangePassFormSubmit);

    const onUsernameBlur = () => setUsernameErr(usernameValidator(formValues.username));

    const onOldPasswordBlur = () => setOldPassErr(oldPassValidator(changePassFormValues.oldPassword));

    const onNewPasswordBlur = () => setNewPassErr(newPassValidator(changePassFormValues.newPassword));

    return (
        <>
            {toast.message && <ToastNotification
                onExited={() => setToast({ message: '' })}
                message={toast.message}
                isSuccessfull={toast.isSuccessfull} />}
            <section className={styles.myProfileSection}>
                <h2 className='text-center mt-3 text-white text-uppercase'>My Profile</h2>
                <h3 className='text-center text-white'>Username: {username}</h3>
                {isAdmin && (
                    <div className={styles.container}>
                        <img src='/src/assets/images/manageUsers.jpg' alt="" />
                        <Card className={styles.card}>
                            <Card.Body>
                                <Card.Text className={styles.cardText}>
                                    {manageUsersCardText}
                                </Card.Text>
                                <Link to={manageUsersPath}>
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
                            <Link to={userRecipesPath.replace(':recipeType', 'all')}>
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
                            <Link to={userFavoriteRecipesPath}>
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
                                    controlId="floatingUsernameInput"
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

                <div className={styles.container}>
                    <img src='/src/assets/images/login-register.jpg' alt="" />
                    <Card className={styles.card}>
                        <Card.Body>
                            <Card.Text className={styles.cardText}>
                                {changePasswordCardText}
                            </Card.Text>
                            <Form onSubmit={changePassOnSubmit}>
                                <FloatingLabel
                                    controlId="floatingOldPassInput"
                                    label="Old Password"
                                    className="mb-3">
                                    <Form.Control
                                        name='oldPassword'
                                        onChange={changePassChangeHandler}
                                        onBlur={onOldPasswordBlur}
                                        value={changePassFormValues.oldPassword}
                                        type="password"
                                        placeholder="Old Password..." />
                                    {oldPassErr && <p className='text-start text-danger'>{oldPassErr}</p>}
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="floatingNewPassInput"
                                    label="New Password"
                                    className="mb-3">
                                    <Form.Control
                                        name='newPassword'
                                        onChange={changePassChangeHandler}
                                        onBlur={onNewPasswordBlur}
                                        value={changePassFormValues.newPassword}
                                        type="password"
                                        placeholder="New Password..." />
                                    {newPassErr && <p className='text-start text-danger'>{newPassErr}</p>}
                                </FloatingLabel>
                                <Button type='submit' bsPrefix={styles.cardBtn}>
                                    Change Password
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>

                <BackToTopArrow />
            </section>
        </>
    )
};

export default UserProfile;