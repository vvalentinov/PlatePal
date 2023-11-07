import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import styles from './RecipeComment.module.css';

import { useState } from 'react';

import useForm from '../../../hooks/useForm';

const RecipeComment = ({ recipeId }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onFormSubmit = (data) => {
        console.log({ ...data, recipeId });
    };

    const { formValues, onChangeHandler, onSubmit } = useForm({
        'text': ''
    }, onFormSubmit);

    return (
        <>
            <div>
                <Button onClick={handleShow}>Post Comment</Button>
            </div>
            <Modal size='lg' centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Post Comment</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmit}>
                    <Modal.Body>
                        <FloatingLabel controlId="floatingTextarea2" label="Your Comment:">
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                name='text'
                                value={formValues.comment}
                                onChange={onChangeHandler}
                                style={{ height: '200px' }}
                            />
                        </FloatingLabel>
                    </Modal.Body>
                    <Modal.Footer bsPrefix={styles.modalFooter}>
                        <div className="d-grid">
                            <Button type='submit' onClick={handleClose} size="lg" >
                                Comment
                            </Button>
                        </div>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default RecipeComment;