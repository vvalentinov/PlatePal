import styles from './EditCommentBtn.module.css';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

import { commentServiceFactory } from '../../../../services/commentService';
import { useService } from '../../../../hooks/useService';

import useForm from '../../../../hooks/useForm';

import { commentValidator } from '../../../../utils/validatorUtil';

const EditCommentBtn = ({ commentId, text, recipeId, onCommentEdit }) => {
    const [show, setShow] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const commentService = useService(commentServiceFactory);

    const onCommentBlur = () => setErrMsg(commentValidator(formValues.text));

    const onEditFormSubmit = () => {
        const error = commentValidator(formValues.text);
        if (error) {
            return setErrMsg(error);
        }

        commentService.edit(commentId, { recipeId, text: formValues.text })
            .then(res => onCommentEdit(res.result, commentId))
            .catch(error => {
                setToastMsg(error.message);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            })
            .finally(() => handleClose());
    };

    const {
        formValues,
        onChangeHandler,
        onSubmit
    } = useForm({ 'text': text }, onEditFormSubmit);

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
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control
                                name='text'
                                className={styles.textArea}
                                value={formValues.text}
                                onChange={onChangeHandler}
                                onBlur={onCommentBlur}
                                as="textarea"
                                rows={8} />
                            {errMsg && <p className='text-start text-danger'>{errMsg}</p>}
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