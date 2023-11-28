import styles from './DeleteCommentBtn.module.css';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { useState } from 'react';

import { commentServiceFactory } from '../../../../services/commentService';
import { useService } from '../../../../hooks/useService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

const DeleteCommentBtn = ({ onCommentDelete, commentId }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const commentService = useService(commentServiceFactory);

    const onDelete = () => {
        commentService.delete(commentId)
            .then(res => onCommentDelete(res.result._id))
            .catch(error => console.log(error));
    };

    return (
        <>
            <Button onClick={handleShow} bsPrefix={styles.cardHeaderContainerBtn}>
                Delete<FontAwesomeIcon className='ms-2' icon={faTrashCan} />
            </Button>
            <Modal
                centered
                show={show}
                size='lg'
                onHide={handleClose}>
                <Modal.Header className={styles.modalHeader} closeButton>
                    <Modal.Title>Delete Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    Are you sure you want to delete your comment?
                    <div className="d-grid">
                        <Button
                            onClick={onDelete}
                            bsPrefix={styles.deleteBtn}
                            size="lg">
                            Delete
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default DeleteCommentBtn;