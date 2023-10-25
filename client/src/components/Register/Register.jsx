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

const Register = () => {
    // Inputs state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    // Inputs errors state
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
    };

    const onUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const onRepeatPasswordChange = (e) => {
        setRepeatPassword(e.target.value);
    }

    const onUsernameBlur = () => {
        if (!username) {
            setUsernameError(errorMessages.usernameEmptyError);
        } else if (username.length < 3 || username.length > 30) {
            setUsernameError(errorMessages.usernameLengthError);
        } else {
            setUsernameError('');
        }
    };

    const onPasswordBlur = () => {
        if (!password) {
            setPasswordError(errorMessages.passwordEmptyError);
        } else if (password !== repeatPassword) {
            setPasswordError(errorMessages.passwordMismatchError);
            setRepeatPasswordError(errorMessages.passwordMismatchError);
        } else {
            if (repeatPasswordError === errorMessages.passwordMismatchError) {
                setRepeatPasswordError('');
            }
            setPasswordError('');
        }
    };

    const onRepeatPasswordBlur = () => {
        if (!repeatPassword) {
            setRepeatPasswordError(errorMessages.repeatPasswordEmptyError);
        } else if (password !== repeatPassword) {
            setPasswordError(errorMessages.passwordMismatchError);
            setRepeatPasswordError(errorMessages.passwordMismatchError);
        } else {
            if (passwordError === errorMessages.passwordMismatchError) {
                setPasswordError('');
            }
            setRepeatPasswordError('');
        }
    };

    return (
        <Container className="my-5 border border-3 border-dark col-6 rounded-4">
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
                            onChange={onUsernameChange}
                            onBlur={onUsernameBlur}
                            value={username}
                        />
                        {usernameError && <p className="text-start text-danger">{usernameError}</p>}
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password" className="mb-4">
                        {/* Password */}
                        <Form.Control
                            name="password"
                            onChange={onPasswordChange}
                            value={password}
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
                            onChange={onRepeatPasswordChange}
                            onBlur={onRepeatPasswordBlur}
                            value={repeatPassword}
                            placeholder="RepeatPassword"
                            className={`border-2 ${repeatPasswordError ? 'border-danger' : 'border-dark'}`}
                        />
                        {repeatPasswordError && <p className="text-start text-danger">{repeatPasswordError}</p>}
                    </FloatingLabel>
                    <div className="text-start mt-4">
                        <Link to="/login">You already have an account? Go to Login!</Link>
                    </div>
                    <Button type="submit" className="button btn-lg my-4 px-4 py-2 text-dark border-2 border-dark">
                        Register
                    </Button>
                </Form>
            </Row>
        </Container>
    );
};

export default Register;