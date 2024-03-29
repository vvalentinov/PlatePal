import styles from './DeleteRecipe.module.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

import { useState } from 'react';

import { recipeServiceFactory } from '../../../services/recipeService';
import { useService } from '../../../hooks/useService';

const DeleteRecipe = ({ recipeId, handleRecipeDelete, text }) => {
    const recipeService = useService(recipeServiceFactory);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onDeleteRecipeBtnClick = () => {
        recipeService.delete(recipeId)
            .then(res => handleRecipeDelete(res))
            .catch(err => console.log(err.message));
    };

    return (
        <>
            <Card className={styles.card}>
                <Card.Body>
                    <Card.Text>
                        {text}
                    </Card.Text>
                    <Button
                        bsPrefix={styles.deleteRecipeBtn}
                        onClick={handleShow}>
                        Delete Recipe
                    </Button>
                </Card.Body>
            </Card>

            <Modal className={styles.modal} centered show={show} onHide={handleClose}>
                <Modal.Header className={styles.modalHeader} closeButton>
                    <Modal.Title>Delete Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    <p>Are you sure you want to delete your recipe?</p>
                </Modal.Body>
                <div className={`d-grid ${styles.modalBtnContainer}`}>
                    <Button onClick={onDeleteRecipeBtnClick} bsPrefix={styles.modalBtn} size="lg">
                        Delete
                    </Button>
                </div>
            </Modal>
        </>
    )
};

export default DeleteRecipe;