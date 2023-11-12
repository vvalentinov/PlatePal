import styles from './DeleteCommentBtn.module.css';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { useContext, useState } from 'react';

import { AuthContext } from '../../../../contexts/AuthContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

const DeleteCommentBtn = ({ handleCommentDelete, commentId }) => {
    const [show, setShow] = useState(false);

    const { token } = useContext(AuthContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onDelete = () => {
        fetch(`http://localhost:3000/comment/delete/${commentId}`, {
            method: 'DELETE',
            headers: {
                'X-Authorization': token
            }
        })
            .then(res => res.json())
            .then(res => handleCommentDelete(res.result._id))
            .catch(error => console.log(error));
    };

    return (
        <>
            <Button
                onClick={handleShow}
                bsPrefix={styles.cardHeaderContainerBtn}>
                Delete
                <FontAwesomeIcon className='ms-2' icon={faTrashCan} />
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