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

import { commentValidator } from '../../../utils/validatorUtil';

import { postCommentCardText } from '../../../constants/cardTextMessages';

const PostRecipeComment = ({ recipeId, onCommentSubmit }) => {
    const [show, setShow] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleClose = () => {
        setShow(false);
        setErrMsg('');
    };
    const handleShow = () => setShow(true);

    const commentService = useService(commentServiceFactory);

    const onCommentBlur = () => setErrMsg(commentValidator(formValues.text));

    const onFormSubmit = (data) => {
        const error = commentValidator(formValues.text);
        if (error) {
            return setErrMsg(error);
        }

        commentService.create({ ...data, recipeId })
            .then(res => onCommentSubmit(res.result))
            .catch(error => {
                setToastMsg(error.message);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }).finally(() => {
                onChangeHandler({ target: { name: 'text', value: '' } });
                handleClose();
            });
    };

    const {
        formValues,
        onChangeHandler,
        onSubmit
    } = useForm({ 'text': '' }, onFormSubmit);

    return (
        <>
            {toastMsg && <ToastNotification
                onExited={() => setToastMsg('')}
                isSuccessfull={false}
                message={toastMsg} />}
            <div className={styles.container}>
                <Card className={styles.postCommentCard}>
                    <Card.Body>
                        <Card.Text>
                            {postCommentCardText}
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
                                onBlur={onCommentBlur}
                                style={{ height: '300px' }}
                                className={styles.commentArea}
                            />
                        </FloatingLabel>
                        {errMsg && <p className='text-start text-danger'>{errMsg}</p>}
                    </Modal.Body>
                    <Modal.Footer bsPrefix={styles.modalFooter}>
                        <div className="d-grid">
                            <Button
                                bsPrefix={styles.modalButton}
                                type='submit'
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