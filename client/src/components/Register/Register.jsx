import styles from './Register.module.css';

import { useState, useContext } from 'react';

// Bootstrap components
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

// Error messages constants
import * as errorMessages from '../../constants/errorMessages';

// Custom useForm hook
import useForm from '../../hooks/useForm';

import * as validatorService from '../../services/validatorService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { AuthContext } from '../../contexts/AuthContext';

import { useNavigate } from 'react-router-dom';

import * as paths from '../../constants/pathNames';

import { authServiceFactory } from '../../services/authService';

const RegisterFormKeys = {
    Username: 'username',
    Password: 'password',
    RepeatPassword: 'repeatPassword',
};

const Register = () => {
    const navigate = useNavigate();
    const authService = authServiceFactory();

    const { userLogin } = useContext(AuthContext);

    const onRegisterSubmit = async (data) => {
        if (data.repeatPassword !== data.password) {
            return;
        }

        try {
            const result = await authService.register(data);
            userLogin(result);
            navigate(paths.homePath);
        } catch (error) {
            console.log(error.message);
        }
    };

    const { formValues, onChangeHandler, onSubmit } = useForm({
        [RegisterFormKeys.Username]: '',
        [RegisterFormKeys.Password]: '',
        [RegisterFormKeys.RepeatPassword]: '',
    }, onRegisterSubmit);

    // Inputs errors state
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState('');

    const onUsernameBlur = () => setUsernameError(validatorService.usernameValidator(formValues.username));

    const onPasswordBlur = () => {
        const error = validatorService.passwordValidator(formValues.password, formValues.repeatPassword);
        setPasswordError(error);
        if (error === errorMessages.passwordsMismatchError ||
            repeatPasswordError === errorMessages.passwordsMismatchError) {
            setRepeatPasswordError(error);
        }
    };

    const onRepeatPasswordBlur = () => {
        const error = validatorService.repeatPasswordValidator(formValues.password, formValues.repeatPassword);
        setRepeatPasswordError(error);
        if (error === errorMessages.passwordsMismatchError ||
            passwordError === errorMessages.passwordsMismatchError) {
            setPasswordError(error);
        }
    };

    return (
        <Container className="my-4 border border-3 border-dark col-6 rounded-4">
            <Row className="text-center">
                <h2 className="my-4">Register</h2>
                <Form onSubmit={onSubmit}>
                    <FloatingLabel
                        controlId="floatingUsernameInput"
                        label="Username"
                        className="mb-4"
                    >
                        {/* Username */}
                        <Form.Control
                            autoComplete="on"
                            name={RegisterFormKeys.Username}
                            type="text"
                            placeholder="username"
                            className={`border-2 ${usernameError ? 'border-danger' : 'border-dark'}`}
                            onChange={onChangeHandler}
                            onBlur={onUsernameBlur}
                            value={formValues[RegisterFormKeys.Username]}
                        />
                        {usernameError && <p className="text-start text-danger">{usernameError}</p>}
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password" className="mb-4">
                        {/* Password */}
                        <Form.Control
                            name={RegisterFormKeys.Password}
                            onChange={onChangeHandler}
                            value={formValues[RegisterFormKeys.Password]}
                            onBlur={onPasswordBlur}
                            type="password"
                            placeholder="Password"
                            className={`border-2 ${passwordError ? 'border-danger' : 'border-dark'}`}
                        />
                        {passwordError && <p className="text-start text-danger">{passwordError}</p>}
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingRepeatPassword" label="Repeat Password">
                        {/* Repeat Password */}
                        <Form.Control
                            type="password"
                            name={RegisterFormKeys.RepeatPassword}
                            onChange={onChangeHandler}
                            onBlur={onRepeatPasswordBlur}
                            value={formValues[RegisterFormKeys.RepeatPassword]}
                            placeholder="RepeatPassword"
                            className={`border-2 ${repeatPasswordError ? 'border-danger' : 'border-dark'}`}
                        />
                        {repeatPasswordError && <p className="text-start text-danger">{repeatPasswordError}</p>}
                    </FloatingLabel>
                    <div className="text-start mt-4">
                        <Link to="/login">You already have an account? Go to Login!</Link>
                    </div>
                    <Button type="submit" bsPrefix={styles.registerButton} className="my-4 px-4 py-1 border-3">Register<FontAwesomeIcon icon={faUser} className="ms-2" /></Button>
                </Form>
            </Row>
        </Container>
    );
};

export default Register;