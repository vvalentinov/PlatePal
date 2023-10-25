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

    const onUsernameBlur = () => {
        if (!formValues.username) {
            setUsernameError(errorMessages.usernameEmptyError);
        } else if (formValues.username.length < 3 || formValues.username.length > 30) {
            setUsernameError(errorMessages.usernameLengthError);
        } else {
            setUsernameError('');
        }
    };

    const onPasswordBlur = () => {
        if (!formValues.password) {
            setPasswordError(errorMessages.passwordEmptyError);
        } else if (formValues.password !== formValues.repeatPassword) {
            setPasswordError(errorMessages.passwordsMismatchError);
            setRepeatPasswordError(errorMessages.passwordsMismatchError);
        } else {
            if (repeatPasswordError === errorMessages.passwordsMismatchError) {
                setRepeatPasswordError('');
            }
            setPasswordError('');
        }
    };

    const onRepeatPasswordBlur = () => {
        if (!formValues.repeatPassword) {
            setRepeatPasswordError(errorMessages.repeatPasswordEmptyError);
        } else if (formValues.password !== formValues.repeatPassword) {
            setPasswordError(errorMessages.passwordsMismatchError);
            setRepeatPasswordError(errorMessages.passwordsMismatchError);
        } else {
            if (passwordError === errorMessages.passwordsMismatchError) {
                setPasswordError('');
            }
            setRepeatPasswordError('');
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
                        Register
                    </Button>
                </Form>
            </Row>
        </Container>
    );
};

export default Register;