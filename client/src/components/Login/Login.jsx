import styles from './Login.module.css';

import { useState, useContext } from 'react';

import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

import { AuthContext } from '../../contexts/AuthContext';
import { useService } from '../../hooks/useService';
import { authServiceFactory } from '../../services/authService';

import * as paths from '../../constants/pathNames';

import { usernameValidator, passwordValidator } from '../../utils/validatorUtil';

import ToastNotification from '../Toast/ToastNotification';

import useForm from '../../hooks/useForm';

const LoginKeys = {
    Username: 'username',
    Password: 'password',
};

const Login = () => {
    const navigate = useNavigate();

    const [toast, setToast] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const { userLogin } = useContext(AuthContext);

    const authService = useService(authServiceFactory);

    const onLoginSubmit = async (data) => {
        setToast('');

        const usernameErrMsg = usernameValidator(formValues[LoginKeys.Username]);
        const passwordErrMsg = passwordValidator(formValues[LoginKeys.Password]);

        if (usernameErrMsg || passwordErrMsg) {
            setUsernameError(usernameErrMsg);
            setPasswordError(passwordErrMsg);
            return;
        }

        try {
            const result = await authService.login(data);
            userLogin(result);
            navigate(-1);
        } catch (error) {
            setToast(error.message);
        }
    };

    const {
        formValues,
        onChangeHandler,
        onSubmit
    } = useForm({ [LoginKeys.Username]: '', [LoginKeys.Password]: '' }, onLoginSubmit);

    const onUsernameBlur = () => setUsernameError(usernameValidator(formValues[LoginKeys.Username]));

    const onPasswordBlur = () => setPasswordError(passwordValidator(formValues[LoginKeys.Password]));

    return (
        <>
            {toast && <ToastNotification message={toast} />}
            <div className={`${styles.container}`}>
                <img
                    className={styles.loginImg}
                    src='/src/assets/images/login-register.jpg'
                    alt="Logo Image..." />
                <Form method="POST" onSubmit={onSubmit} className={styles.form}>
                    <h2 className="my-3">Login</h2>
                    <FloatingLabel controlId="floatingInput" label="Username" className="mb-4">
                        <Form.Control
                            name={LoginKeys.Username}
                            autoComplete="on"
                            type="text"
                            onChange={onChangeHandler}
                            onBlur={onUsernameBlur}
                            value={formValues[LoginKeys.Username]}
                            placeholder="username"
                            className={usernameError ? styles.formControlError : styles.formControl}
                        />
                        {usernameError && <p className='text-start text-danger'>{usernameError}</p>}
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control
                            name={LoginKeys.Password}
                            type="password"
                            onChange={onChangeHandler}
                            onBlur={onPasswordBlur}
                            placeholder="Password"
                            className={passwordError ? styles.formControlError : styles.formControl}
                        />
                        {passwordError && <p className='text-start text-danger'>{passwordError}</p>}
                    </FloatingLabel>
                    <div className="text-start mt-4">
                        <Link to="/register">You don't have an account? Register here!</Link>
                    </div>
                    <Button type='submit' bsPrefix={styles.loginButton} className="my-3 border-3 px-3 py-1">
                        Login<FontAwesomeIcon icon={faRightToBracket} className="ms-2" />
                    </Button>
                </Form>
            </div>
        </>
    );
};

export default Login;