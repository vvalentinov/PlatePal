import styles from './ManageUsers.module.css';

import { useState, useEffect } from 'react';

import { userServiceFactory } from '../../services/userService';
import { useService } from '../../hooks/useService';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import ToastNotification from '../Toast/ToastNotification';

const ManageUsers = () => {
    const userService = useService(userServiceFactory);

    const [userId, setUserId] = useState('');
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [toast, setToast] = useState({ message: '', isSuccessfull: false });

    const handleClose = () => {
        setShow(false);
        setUserId('');
    };
    const handleShow = (userId) => {
        setShow(true);
        setUserId(userId);
    };

    useEffect(() => {
        userService.getAllUsers()
            .then(res => setUsers(res.result))
            .catch(err => console.log(err.message));
    }, []);

    const makeUserAdminHandler = async () => {
        try {
            const response = await userService.makeAdmin(userId);
            setUsers((prevUsers) => {
                return prevUsers.map((user) => {
                    if (user._id === userId) {
                        return response.result;
                    }
                    return user;
                });
            });
            handleClose();
            setToast({ message: response.message, isSuccessfull: true });
            window.scrollTo(0, 0);
        } catch (error) {
            handleClose();
            setToast({ message: error.message, isSuccessfull: false });
            window.scrollTo(0, 0);
        }
    };

    return (
        <>
            {toast.message && <ToastNotification
                message={toast.message}
                isSuccessfull={toast.isSuccessfull}
                onExited={() => setToast({ message: '' })} />}
            <h2 className="text-center mt-3">Manage Users!</h2>
            <div className={styles.tableContainer}>
                <Table striped bordered hover className={styles.table}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && (
                            <>
                                {users.map((x, index) => (
                                    <tr key={x._id} className='align-middle'>
                                        <td>{index + 1}</td>
                                        <td>{x.username}</td>
                                        <td>{x.isAdmin ? 'Admin' : 'User'}</td>
                                        <td className={styles.actionsCell}>
                                            <Button size='lg'>Delete</Button>
                                            {!x.isAdmin &&
                                                <Button
                                                    size='lg'
                                                    onClick={() => handleShow(x._id)}>
                                                    Make Admin
                                                </Button>}
                                        </td>
                                    </tr>
                                ))}
                            </>
                        )}
                    </tbody>
                </Table>
                <Modal className={styles.modal} centered show={show} onHide={handleClose}>
                    <Modal.Header className={styles.modalHeader} closeButton>
                        <Modal.Title>Make User Admin</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={styles.modalBody}>
                        <p>Are you sure you want to make this user an administrator?</p>
                    </Modal.Body>
                    <div className={`d-grid ${styles.modalBtnContainer}`}>
                        <Button onClick={makeUserAdminHandler} bsPrefix={styles.modalBtn} size="lg">
                            Make Admin
                        </Button>
                    </div>
                </Modal>
            </div>
        </>
    )
};

export default ManageUsers;