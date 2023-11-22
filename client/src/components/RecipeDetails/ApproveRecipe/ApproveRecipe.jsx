import styles from './ApproveRecipe.module.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { approveRecipeCardText } from '../../../constants/cardTextMessages';

import { recipeServiceFactory } from '../../../services/recipeService';
import { useService } from '../../../hooks/useService';

const ApproveRecipe = ({ recipeId, handleApprovingRecipe, showToast }) => {
    const recipeService = useService(recipeServiceFactory);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onApproveRecipeClick = () => {
        handleClose();

        recipeService.approveRecipe(recipeId)
            .then(res => {
                handleApprovingRecipe(res.result);
                showToast(res.message, true);
            })
            .catch(error => showToast(error.message, false))
            .finally(() => window.scrollTo(0, 0));
    };

    return (
        <>
            <Card className={styles.card}>
                <Card.Body>
                    <Card.Text>
                        {approveRecipeCardText}
                    </Card.Text>
                    <Button
                        bsPrefix={styles.approveRecipeBtn}
                        onClick={handleShow}>
                        Approve Recipe<FontAwesomeIcon icon={faCheck} className='ms-2' />
                    </Button>
                </Card.Body>
            </Card>

            <Modal className={styles.modal} centered show={show} onHide={handleClose}>
                <Modal.Header className={styles.modalHeader} closeButton>
                    <Modal.Title>Approve Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    <p>Are you sure you want to approve this recipe?</p>
                </Modal.Body>
                <div className={`d-grid ${styles.modalBtnContainer}`}>
                    <Button onClick={onApproveRecipeClick} bsPrefix={styles.modalBtn} size="lg">
                        Approve
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default ApproveRecipe;