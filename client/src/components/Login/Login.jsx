import styles from './Login.module.css';

import { useState, useContext } from 'react';

// Bootstrap components
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

// Error Message
import * as errorMessages from '../../constants/errorMessages';

// Validator Service
import * as validatorService from '../../services/validatorService';

// Custom useForm hook
import useForm from '../../hooks/useForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

import { AuthContext } from '../../contexts/AuthContext';

import { authServiceFactory } from '../../services/authService';

import { useNavigate } from 'react-router-dom';

import * as paths from '../../constants/pathNames';

const LoginFormKeys = {
    Username: 'username',
    Password: 'password',
};

const Login = () => {
    const navigate = useNavigate();

    const { userLogin } = useContext(AuthContext);

    const authService = authServiceFactory();

    const onLoginSubmit = async (data) => {
        try {
            const result = await authService.login(data);
            userLogin(result);
            navigate(paths.homePath);
        } catch (error) {
            console.log(error.message);
        }
    };

    // Custom useForm Hook for managing form state
    const { formValues, onChangeHandler, onSubmit } = useForm({
        [LoginFormKeys.Username]: '',
        [LoginFormKeys.Password]: '',
    }, onLoginSubmit);

    // Inputs errors state
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const onUsernameBlur = () => setUsernameError(validatorService.usernameValidator(formValues.username));

    const onPasswordBlur = () => {
        if (!formValues.password) {
            setPasswordError(errorMessages.passwordEmptyError);
        } else {
            setPasswordError('');
        }
    };

    return (
        <Container className="my-4 border border-3 border-dark col-6 rounded-4">
            <Row className="text-center">
                <h2 className="my-3">Login</h2>
                <Form method="POST" onSubmit={onSubmit}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Username"
                        className="mb-4"
                    >
                        <Form.Control
                            autoComplete="on"
                            type="text"
                            name={LoginFormKeys.Username}
                            onChange={onChangeHandler}
                            onBlur={onUsernameBlur}
                            value={formValues[LoginFormKeys.Username]}
                            placeholder="username"
                            className={`border-2 ${usernameError ? 'border-danger' : 'border-dark'}`} />
                        {usernameError && <p className="text-start text-danger">{usernameError}</p>}
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control
                            autoComplete="on"
                            type="password"
                            name={LoginFormKeys.Password}
                            onChange={onChangeHandler}
                            onBlur={onPasswordBlur}
                            value={formValues[LoginFormKeys.Password]}
                            placeholder="Password"
                            className={`border-2 ${passwordError ? 'border-danger' : 'border-dark'}`} />
                        {passwordError && <p className="text-start text-danger">{passwordError}</p>}
                    </FloatingLabel>
                    <div className="text-start mt-4">
                        <Link to="/register">You don't have an account? Register here!</Link>
                    </div>
                    <Button type='submit' bsPrefix={styles.loginButton} className="my-3 border-3 px-3 py-1">
                        Login<FontAwesomeIcon icon={faRightToBracket} className="ms-2" />
                    </Button>
                </Form>
            </Row>
        </Container>
    );
};

export default Login;