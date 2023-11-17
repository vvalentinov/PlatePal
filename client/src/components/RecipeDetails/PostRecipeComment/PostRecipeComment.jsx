import styles from './PostRecipeComment.module.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import { useState } from 'react';

import useForm from '../../../hooks/useForm';
import { useService } from '../../../hooks/useService';

import { commentServiceFactory } from '../../../services/commentService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

import ToastNotification from './../../Toast/ToastNotification';

const PostRecipeComment = ({ recipeId, onCommentSubmit }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [toastMsg, setToastMsg] = useState('');

    const commentService = useService(commentServiceFactory);

    const onFormSubmit = (data) => {
        setToastMsg('');
        commentService.create({ ...data, recipeId, createdAt: new Date() })
            .then(res => onCommentSubmit(res.result))
            .catch(error => {
                setToastMsg(error.message);
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }).finally(() => onChangeHandler({ target: { name: 'text', value: '' } }));
    };

    const {
        formValues,
        onChangeHandler,
        onSubmit
    } = useForm({ 'text': '' }, onFormSubmit);

    return (
        <>
            {toastMsg && <ToastNotification isSuccessfull={false} message={toastMsg} />}
            <div className={styles.container}>
                <Card className={styles.postCommentCard}>
                    <Card.Body>
                        <Card.Text>
                            We value your thoughts and insights! Your comments can add a personal touch to the recipe, sharing your unique experience and tips. Whether it's a modification you made, an ingredient you love, or just your overall impression, your comments contribute to our vibrant culinary community. Don't hesitate to share your thoughts below – your comment might be the inspiration someone else is looking for! Let's make this cooking journey even more delightful together.
                        </Card.Text>
                        <Button bsPrefix={styles.commentButton} onClick={handleShow}>
                            Post Comment<FontAwesomeIcon className='ms-2' icon={faComment} />
                        </Button>
                    </Card.Body>
                </Card>
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
                                value={formValues.text}
                                onChange={onChangeHandler}
                                style={{ height: '300px' }}
                                className={styles.commentArea}
                            />
                        </FloatingLabel>
                    </Modal.Body>
                    <Modal.Footer bsPrefix={styles.modalFooter}>
                        <div className="d-grid">
                            <Button
                                bsPrefix={styles.modalButton}
                                type='submit'
                                onClick={handleClose}
                                size="lg" >
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