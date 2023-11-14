import { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

import styles from './ToastNotification.module.css';

function ToastNotification({ message }) {
    const [show, setShow] = useState(true);
    const toggleShowA = () => setShow(!show);

    return (
        <ToastContainer position='top-end'>
            <Toast
                className={`${styles.toast} border-2 border-black`}
                show={show}
                onClose={toggleShowA}
                delay={8000}
                autohide
                bg='danger'>
                <Toast.Header className='border-bottom border-2 border-black'>
                    <FontAwesomeIcon icon={faTriangleExclamation} className='me-2' />
                    <strong className="me-auto">Ooops! Something went wrong!</strong>
                </Toast.Header>
                <Toast.Body className='fs-5'>{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default ToastNotification;