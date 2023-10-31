import styles from './Register.module.css';

import { useState, useContext } from 'react';

import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { AuthContext } from '../../contexts/AuthContext';

import { useService } from '../../hooks/useService';

import { useNavigate } from 'react-router-dom';

import * as paths from '../../constants/pathNames';
import * as errorMessages from '../../constants/errorMessages';

import { authServiceFactory } from '../../services/authService';

import ToastNotification from '../Toast/ToastNotification';

import { useForm, Controller } from "react-hook-form";

const RegisterKeys = {
    Username: 'username',
    Password: 'password',
    RepeatPassword: 'repeatPassword'
};

const Register = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        getValues,
        setError,
        clearErrors,
    } = useForm({ mode: "onBlur" });

    const [toast, setToast] = useState('');

    const navigate = useNavigate();

    const authService = useService(authServiceFactory);

    const { userLogin } = useContext(AuthContext);

    const onRegisterSubmit = async (data) => {
        setToast('');

        try {
            const result = await authService.register(data);
            userLogin(result);
            navigate(paths.homePath);
        } catch (error) {
            setToast(error.message);
        }
    };

    return (
        <>
            {toast && <ToastNotification message={toast} />}
            <div className={styles.container}>
                <img
                    className={styles.registerImg}
                    src="https://res.cloudinary.com/web-project-softuni/image/upload/v1698070763/Register-Login/register_walfov.jpg"
                    alt="Register Image..."
                />
                <Form onSubmit={handleSubmit(onRegisterSubmit)} className={styles.form}>
                    <h2 className="my-4">Register</h2>
                    <FloatingLabel
                        controlId="floatingUsernameInput"
                        label="Username"
                        className="mb-4"
                    >
                        <Controller
                            control={control}
                            name={RegisterKeys.Username}
                            rules={{
                                required: errorMessages.usernameEmptyError,
                                minLength: { value: 3, message: errorMessages.usernameLengthError },
                                maxLength: { value: 30, message: errorMessages.usernameLengthError },
                            }}
                            render={({ field: { onChange, onBlur } }) => (
                                <Form.Control
                                    autoComplete="on"
                                    type="text"
                                    placeholder="username"
                                    className={`
                                        border-2
                                        ${styles.formControl}
                                        ${errors[RegisterKeys.Username] ? 'border-danger' : 'border-dark'}`}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                />
                            )}
                        />
                        {errors[RegisterKeys.Username] && (
                            <p className="text-start text-danger">
                                {errors[RegisterKeys.Username].message}
                            </p>
                        )}
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password" className="mb-4">
                        <Controller
                            control={control}
                            name={RegisterKeys.Password}
                            rules={{
                                required: errorMessages.passwordEmptyError,
                                validate: (value) => {
                                    if (value !== getValues(RegisterKeys.RepeatPassword)) {
                                        setError(RegisterKeys.RepeatPassword, {
                                            type: 'validate',
                                            message: errorMessages.passwordsMismatchError
                                        });
                                        return errorMessages.passwordsMismatchError;
                                    }
                                    clearErrors(RegisterKeys.RepeatPassword);
                                    return true;
                                }
                            }}
                            render={({ field: { onChange, onBlur } }) => (
                                <Form.Control
                                    type="password"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    placeholder="Password"
                                    className={`
                                        border-2
                                        ${styles.formControl}
                                        ${errors[RegisterKeys.Password] ? 'border-danger' : 'border-dark'}`}
                                />
                            )}
                        />
                        {errors[RegisterKeys.Password] && (
                            <p className="text-start text-danger">
                                {errors[RegisterKeys.Password].message}
                            </p>
                        )}
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingRepeatPassword" label="Repeat Password">
                        <Controller
                            control={control}
                            name={RegisterKeys.RepeatPassword}
                            rules={{
                                required: errorMessages.repeatPasswordEmptyError,
                                validate: (value) => {
                                    if (value !== getValues(RegisterKeys.Password)) {
                                        setError(RegisterKeys.Password, { type: 'validate', message: errorMessages.passwordsMismatchError });
                                        return errorMessages.passwordsMismatchError;
                                    }
                                    clearErrors(RegisterKeys.Password);
                                    return true;
                                }
                            }}
                            render={({ field: { onChange, onBlur } }) => (
                                <Form.Control
                                    type="password"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    placeholder="Repeat Password"
                                    className={`
                                        border-2
                                        ${styles.formControl}
                                        ${errors[RegisterKeys.RepeatPassword] ? 'border-danger' : 'border-dark'}`}
                                />
                            )}
                        />
                        {errors[RegisterKeys.RepeatPassword] && (
                            <p className="text-start text-danger">
                                {errors[RegisterKeys.RepeatPassword].message}
                            </p>
                        )}
                    </FloatingLabel>
                    <div className="text-start mt-4">
                        <Link to="/login">You already have an account? Go to Login!</Link>
                    </div>
                    <Button
                        type="submit"
                        bsPrefix={styles.registerButton}
                        className="my-4 px-4 py-1 border-3"
                    >
                        Register<FontAwesomeIcon icon={faUser} className="ms-2" />
                    </Button>
                </Form>
            </div>
        </>
    );
};

export default Register;