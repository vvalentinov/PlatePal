import styles from './ApproveRecipe.module.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useState, useContext } from 'react';

import { AuthContext } from '../../../contexts/AuthContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const ApproveRecipe = ({ recipeId, handleApprovingRecipe }) => {

    const [show, setShow] = useState(false);

    const { token } = useContext(AuthContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onFormSubmit = () => {
        handleClose();

        fetch(`http://localhost:3000/recipe/approve/${recipeId}`, {
            method: 'PUT',
            headers: {
                'X-Authorization': token
            }
        }).
            then(res => res.json())
            .then(res => handleApprovingRecipe(res.result))
            .catch(error => console.log(error));
    };

    return (
        <>
            <Button
                bsPrefix={styles.approveRecipeBtn}
                onClick={handleShow}>
                Approve Recipe<FontAwesomeIcon icon={faCheck} className='ms-2' />
            </Button>
            <Modal className={styles.modal} centered show={show} onHide={handleClose}>
                <Modal.Header className={styles.modalHeader} closeButton>
                    <Modal.Title>Approve Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    <p>Are you sure you want to approve this recipe?</p>
                </Modal.Body>
                <div className={`d-grid ${styles.modalBtnContainer}`}>
                    <Button onClick={onFormSubmit} bsPrefix={styles.modalBtn} size="lg">
                        Approve
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default ApproveRecipe;