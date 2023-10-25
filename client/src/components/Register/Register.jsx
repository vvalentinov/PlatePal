import { useState } from 'react';

// Bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { Link } from 'react-router-dom';

// Error messages constants
import * as errorMessages from '../../constants/errorMessages';

// Custom useForm hook
import useForm from '../../hooks/useForm';

import * as validatorService from '../../services/validatorService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
    const { formValues, onChangeHandler } = useForm({
        username: '',
        password: '',
        repeatPassword: '',
    });

    // Inputs errors state
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
    };

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
                            name="username"
                            type="text"
                            placeholder="username"
                            className={`border-2 ${usernameError ? 'border-danger' : 'border-dark'}`}
                            onChange={onChangeHandler}
                            onBlur={onUsernameBlur}
                            value={formValues.username}
                        />
                        {usernameError && <p className="text-start text-danger">{usernameError}</p>}
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password" className="mb-4">
                        {/* Password */}
                        <Form.Control
                            name="password"
                            onChange={onChangeHandler}
                            value={formValues.password}
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
                            name="repeatPassword"
                            onChange={onChangeHandler}
                            onBlur={onRepeatPasswordBlur}
                            value={formValues.repeatPassword}
                            placeholder="RepeatPassword"
                            className={`border-2 ${repeatPasswordError ? 'border-danger' : 'border-dark'}`}
                        />
                        {repeatPasswordError && <p className="text-start text-danger">{repeatPasswordError}</p>}
                    </FloatingLabel>
                    <div className="text-start mt-4">
                        <Link to="/login">You already have an account? Go to Login!</Link>
                    </div>
                    <Button type="submit" className="button btn-lg my-4 px-4 py-2 border-2 border-dark">
                        Register<FontAwesomeIcon className="ms-1" icon={faUser} />
                    </Button>
                </Form>
            </Row>
        </Container>
    );
};

export default Register;