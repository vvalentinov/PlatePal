import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { Link } from 'react-router-dom';

import * as errorMessages from '../../constants/errorMessages';

const Login = () => {
    // Inputs state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Inputs errors state
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
    };

    const onUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
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
                            onChange={onUsernameChange}
                            onBlur={onUsernameBlur}
                            value={username}
                            placeholder="username"
                            className={`border-2 ${usernameError ? 'border-danger' : 'border-dark'}`} />
                        {usernameError && <p className="text-start text-danger">{usernameError}</p>}
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control
                            type="password"
                            name="password"
                            onChange={onPasswordChange}
                            onBlur={onPasswordBlur}
                            value={password}
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