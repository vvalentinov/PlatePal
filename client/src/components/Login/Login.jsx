import styles from './Login.module.css';

import { useState, useContext } from 'react';

import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

import { Link, useNavigate } from 'react-router-dom';

import { useForm, Controller } from "react-hook-form";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

import { AuthContext } from '../../contexts/AuthContext';
import { authServiceFactory } from '../../services/authService';

import * as paths from '../../constants/pathNames';
import * as errorMessages from '../../constants/errorMessages';

import ToastNotification from '../Toast/ToastNotification';

const LoginKeys = {
    Username: 'username',
    Password: 'password',
};

const Login = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ mode: "onBlur" });

    const [toast, setToast] = useState('');

    const navigate = useNavigate();

    const { userLogin, token } = useContext(AuthContext);

    const authService = authServiceFactory(token);

    const onLoginSubmit = async (data) => {
        setToast('');

        try {
            const result = await authService.login(data);
            userLogin(result);
            navigate(paths.homePath);
        } catch (error) {
            setToast(error.message);
        }
    };

    return (
        <>
            {toast && <ToastNotification message={toast} />}
            <div className={`${styles.container}`}>
                <img className={styles.loginImg} src="https://res.cloudinary.com/web-project-softuni/image/upload/v1698070763/Register-Login/register_walfov.jpg" alt="Logo Image..." />
                <Form method="POST" onSubmit={handleSubmit(onLoginSubmit)} className={styles.form}>
                    <h2 className="my-3">Login</h2>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Username"
                        className="mb-4"
                    >
                        <Controller
                            control={control}
                            name={LoginKeys.Username}
                            rules={{
                                required: errorMessages.usernameEmptyError,
                                minLength: { value: 3, message: errorMessages.usernameLengthError },
                                maxLength: { value: 30, message: errorMessages.usernameLengthError },
                            }}
                            render={({ field: { onChange, onBlur } }) => (
                                <Form.Control
                                    autoComplete="on"
                                    type="text"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    placeholder="username"
                                    className={`border-2 ${styles.formControl} ${errors[LoginKeys.Username] ? 'border-danger' : 'border-dark'}`}
                                />
                            )}
                        />
                        {errors[LoginKeys.Username] && <p className="text-start text-danger">{errors[LoginKeys.Username].message}</p>}
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Controller
                            control={control}
                            name={LoginKeys.Password}
                            rules={{ required: errorMessages.passwordEmptyError }}
                            render={({ field: { onChange, onBlur } }) => (
                                <Form.Control
                                    type="password"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    placeholder="Password"
                                    className={`border-2 ${styles.formControl} ${errors[LoginKeys.Password] ? 'border-danger' : 'border-dark'}`}
                                />
                            )}
                        />
                        {errors[LoginKeys.Password] && <p className="text-start text-danger">{errors[LoginKeys.Password].message}</p>}
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