import styles from './Register.module.css';

import { useState, useContext } from 'react';

import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { AuthContext } from '../../contexts/AuthContext';

import { useService } from '../../hooks/useService';

import * as paths from '../../constants/pathNames';

import { authServiceFactory } from '../../services/authService';

import ToastNotification from '../Toast/ToastNotification';

import useForm from '../../hooks/useForm';

import * as validator from '../../utils/validatorUtil';

import * as errors from '../../constants/errorMessages';

const RegisterKeys = {
    Username: 'username',
    Password: 'password',
    RepeatPassword: 'repeatPassword'
};

const Register = () => {
    const navigate = useNavigate();

    const [toast, setToast] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [repeatPassError, setRepeatPassError] = useState('');

    const authService = useService(authServiceFactory);

    const { userLogin } = useContext(AuthContext);

    const onRegisterSubmit = async (data) => {
        setToast('');

        const username = formValues[RegisterKeys.Username];
        const password = formValues[RegisterKeys.Password];
        const repeatPass = formValues[RegisterKeys.RepeatPassword];

        const usernameErrMsg = validator.usernameValidator(username);
        const passwordErrMsg = validator.passwordValidator(password, repeatPass);
        const repeatPassErrMsg = validator.repeatPassValidator(password, repeatPass);

        if (usernameErrMsg || passwordErrMsg || repeatPassErrMsg) {
            setUsernameError(usernameErrMsg);
            setPasswordError(passwordErrMsg);
            setRepeatPassError(repeatPassErrMsg);
            return;
        }

        try {
            const result = await authService.register(data);
            userLogin(result);
            navigate(paths.homePath);
        } catch (error) {
            setToast(error.message);
        }
    };

    const {
        formValues,
        onChangeHandler,
        onSubmit
    } = useForm(
        {
            [RegisterKeys.Username]: '',
            [RegisterKeys.Password]: '',
            [RegisterKeys.RepeatPassword]: ''
        }, onRegisterSubmit);

    const onUsernameBlur = () => setUsernameError(validator.usernameValidator(formValues[RegisterKeys.Username]));

    const onPasswordBlur = () => {
        const password = formValues[RegisterKeys.Password];
        const repeatPass = formValues[RegisterKeys.RepeatPassword];

        const passwordErrMsg = validator.passwordValidator(password, repeatPass);

        if (passwordErrMsg === errors.passwordsMismatchError) {
            setPasswordError(passwordErrMsg);
            setRepeatPassError(passwordErrMsg);
        } else if (passwordErrMsg === errors.passwordRequiredError) {
            setPasswordError(passwordErrMsg);
        } else {
            setPasswordError(passwordErrMsg);
            setRepeatPassError(validator.repeatPassValidator(password, repeatPass));
        }
    };

    const onRepeatPassBlur = () => {
        const password = formValues[RegisterKeys.Password];
        const repeatPass = formValues[RegisterKeys.RepeatPassword];

        const repeatPassErrMsg = validator.repeatPassValidator(password, repeatPass);

        if (repeatPassErrMsg === errors.passwordsMismatchError) {
            setPasswordError(repeatPassErrMsg);
            setRepeatPassError(repeatPassErrMsg);
        } else if (repeatPassErrMsg === errors.repeatPasswordRequiredError) {
            setRepeatPassError(repeatPassErrMsg);
        } else {
            setRepeatPassError(repeatPassErrMsg);
            setPasswordError(validator.passwordValidator(password, repeatPass));
        }
    };

    return (
        <>
            {toast && <ToastNotification message={toast} />}
            <div className={styles.container}>
                <img className={styles.registerImg} src='/src/assets/images/login-register.jpg' alt="Register Image..." />
                <Form onSubmit={onSubmit} className={styles.form}>
                    <h2 className="my-4">Register</h2>
                    <FloatingLabel controlId="floatingUsernameInput" label="Username" className="mb-4">
                        <Form.Control
                            autoComplete="on"
                            type="text"
                            name={RegisterKeys.Username}
                            placeholder="username"
                            className={usernameError ? styles.formControlError : styles.formControl}
                            onChange={onChangeHandler}
                            onBlur={onUsernameBlur}
                        />
                        {usernameError && <p className='text-start text-danger'>{usernameError}</p>}
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password" className="mb-4">
                        <Form.Control
                            type="password"
                            onChange={onChangeHandler}
                            onBlur={onPasswordBlur}
                            name={RegisterKeys.Password}
                            placeholder="Password"
                            className={passwordError ? styles.formControlError : styles.formControl}
                        />
                        {passwordError && <p className='text-start text-danger'>{passwordError}</p>}
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingRepeatPassword" label="Repeat Password">
                        <Form.Control
                            name={RegisterKeys.RepeatPassword}
                            type="password"
                            onChange={onChangeHandler}
                            onBlur={onRepeatPassBlur}
                            placeholder="Repeat Password"
                            className={repeatPassError ? styles.formControlError : styles.formControl}
                        />
                        {repeatPassError && <p className='text-start text-danger'>{repeatPassError}</p>}
                    </FloatingLabel>
                    <div className="text-start mt-4">
                        <Link to="/login">You already have an account? Go to Login!</Link>
                    </div>
                    <Button type="submit" bsPrefix={styles.registerButton} className="my-4 px-4 py-1 border-3">
                        Register<FontAwesomeIcon icon={faUser} className="ms-2" />
                    </Button>
                </Form>
            </div>
        </>
    );
};

export default Register;