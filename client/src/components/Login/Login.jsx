import { useState } from 'react';

// Bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { Link } from 'react-router-dom';

// Error Message
import * as errorMessages from '../../constants/errorMessages';

// Validator Service
import * as validatorService from '../../services/validatorService';

// Custom useForm hook
import useForm from '../../hooks/useForm';

const Login = () => {
    const { formValues, onChangeHandler } = useForm({
        username: '',
        password: '',
    });

    // Inputs errors state
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
    };

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
                <Form autoComplete="on" onSubmit={onSubmit}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Username"
                        className="mb-4"
                    >
                        <Form.Control
                            type="text"
                            name="username"
                            onChange={onChangeHandler}
                            onBlur={onUsernameBlur}
                            value={formValues.username}
                            placeholder="username"
                            className={`border-2 ${usernameError ? 'border-danger' : 'border-dark'}`} />
                        {usernameError && <p className="text-start text-danger">{usernameError}</p>}
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control
                            type="password"
                            name="password"
                            onChange={onChangeHandler}
                            onBlur={onPasswordBlur}
                            value={formValues.password}
                            placeholder="Password"
                            className={`border-2 ${passwordError ? 'border-danger' : 'border-dark'}`} />
                        {passwordError && <p className="text-start text-danger">{passwordError}</p>}
                    </FloatingLabel>
                    <div className="text-start mt-4">
                        <Link to="/register">You don't have an account? Register here!</Link>
                    </div>
                    <Button type="submit" className="button btn-lg my-4 px-4 py-2 border-2 border-dark">
                        Login
                    </Button>
                </Form>
            </Row>
        </Container>
    );
};

export default Login;