import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import styles from './PostRecipeComment.module.css';

import { useState, useContext } from 'react';

import useForm from '../../../hooks/useForm';

import { AuthContext } from '../../../contexts/AuthContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

const PostRecipeComment = ({ recipeId, onCommentSubmit }) => {
    const [show, setShow] = useState(false);

    const { token } = useContext(AuthContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onFormSubmit = (data) => {
        fetch('http://localhost:3000/comment/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token,
            },
            body: JSON.stringify({ ...data, recipeId })
        })
            .then(res => res.json())
            .then(res => onCommentSubmit(res.result))
            .catch(error => console.log(error));
    };

    const {
        formValues,
        onChangeHandler,
        onSubmit
    } = useForm({ 'text': '' }, onFormSubmit);

    return (
        <>
            <div className={styles.container}>
                <Button
                    bsPrefix={styles.commentButton}
                    onClick={handleShow}>
                    Post Comment<FontAwesomeIcon className='ms-2' icon={faComment} />
                </Button>
            </div>
            <Modal size='lg' centered show={show} onHide={handleClose}>
                <Modal.Header className={styles.modalHeader} closeButton>
                    <Modal.Title>Post Comment</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmit}>
                    <Modal.Body className={styles.modalBody}>
                        <FloatingLabel controlId="floatingTextarea2" label="Comment:">
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                name="text"
                                value={formValues.comment}
                                onChange={onChangeHandler}
                                style={{ height: '300px' }}
                            />
                        </FloatingLabel>
                    </Modal.Body>
                    <Modal.Footer bsPrefix={styles.modalFooter}>
                        <div className="d-grid">
                            <Button bsPrefix={styles.modalButton} type='submit' onClick={handleClose} size="lg" >
                                Comment
                            </Button>
                        </div>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default PostRecipeComment;