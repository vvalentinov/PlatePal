import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useContext, useState } from 'react';

import { AuthContext } from '../../../../contexts/AuthContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

import styles from './EditCommentBtn.module.css';

const EditCommentBtn = ({
    commentId,
    text,
    handleCommentEdit,
    recipeId
}) => {
    const [editCommentValue, setEditCommentValue] = useState(text);
    const [show, setShow] = useState(false);

    const { token } = useContext(AuthContext);

    const handleClose = () => {
        setShow(false);
        setEditCommentValue(editCommentValue);
    }
    const handleShow = () => setShow(true);

    const onEditCommentChange = (e) => setEditCommentValue(e.target.value);

    const onEditFormSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:3000/comment/edit/${commentId}`,
            {
                method: 'PUT',
                headers: {
                    'X-Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ recipeId, text: editCommentValue })
            })
            .then(res => res.json())
            .then(res => handleCommentEdit(res.result, commentId))
            .catch(error => console.log(error))
            .finally(() => handleClose());
    };

    return (
        <>
            <Button
                onClick={handleShow}
                bsPrefix={styles.cardHeaderContainerBtn}>
                Edit<FontAwesomeIcon className='ms-2' icon={faPenToSquare} />
            </Button>
            <Modal centered show={show} size='lg' onHide={handleClose}>
                <Modal.Header className={styles.modalHeader} closeButton>
                    <Modal.Title>Edit Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    <Form onSubmit={onEditFormSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control
                                className={styles.textArea}
                                value={editCommentValue}
                                onChange={onEditCommentChange}
                                as="textarea"
                                rows={8} />
                        </Form.Group>
                        <div className="d-grid">
                            <Button type='submit' bsPrefix={styles.editBtn} size="lg">
                                Edit
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default EditCommentBtn;