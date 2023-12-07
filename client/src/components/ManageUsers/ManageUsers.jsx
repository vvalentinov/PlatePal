import styles from './ManageUsers.module.css';

import { useState, useEffect } from 'react';

import { userServiceFactory } from '../../services/userService';
import { useService } from '../../hooks/useService';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import ToastNotification from '../Toast/ToastNotification';

import BackToTopArrow from '../BackToTopArrow/BackToTopArrow';

import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

const FilterBtnsKeys = {
    AllUsers: 'All',
    Users: 'Users',
    Admins: 'Admins'
};

const ManageUsers = () => {
    const { userLogin } = useContext(AuthContext);

    const userService = useService(userServiceFactory);

    const [userId, setUserId] = useState('');
    const [users, setUsers] = useState([]);
    const [toast, setToast] = useState({ message: '', isSuccessfull: false });

    const [showAdminModal, setShowAdminModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [currentBtn, setCurrentBtn] = useState(FilterBtnsKeys.AllUsers);

    const handleAdminModalClose = () => {
        setShowAdminModal(false);
        setUserId('');
    };
    const handleAdminModalShow = (userId) => {
        setShowAdminModal(true);
        setUserId(userId);
    };
    const handleDeleteModalClose = () => {
        setShowDeleteModal(false);
        setUserId('');
    };
    const handleDeleteModalShow = (userId) => {
        setShowDeleteModal(true);
        setUserId(userId);
    };

    useEffect(() => {
        userService.getAllUsers(currentBtn)
            .then(res => setUsers(res.result))
            .catch(err => console.log(err.message));
    }, [currentBtn]);

    const changeUserRoleHandler = async () => {
        try {
            const response = await userService.changeRole(userId);
            setUsers((prevUsers) => {
                return prevUsers.map((user) => {
                    if (user._id === userId) {
                        return response.result;
                    }
                    return user;
                });
            });
            userLogin(response.session);
            handleAdminModalClose();
            setToast({ message: response.message, isSuccessfull: true });
            window.scrollTo(0, 0);
        } catch (error) {
            handleAdminModalClose();
            setToast({ message: error.message, isSuccessfull: false });
            window.scrollTo(0, 0);
        }
    };

    const deleteUserHandler = async () => {
        try {
            const response = await userService.deleteUser(userId);
            setUsers((prevUsers) => prevUsers.filter((x) => x._id !== response.result));
            handleDeleteModalClose();
            setToast({ message: response.message, isSuccessfull: true });
            window.scrollTo(0, 0);
        } catch (error) {
            handleDeleteModalClose();
            setToast({ message: error.message, isSuccessfull: false });
            window.scrollTo(0, 0);
        }
    };

    const onFilterBtnClick = (type) => setCurrentBtn(type);

    return (
        <section className={styles.manageUsersSection}>
            {toast.message && <ToastNotification
                message={toast.message}
                isSuccessfull={toast.isSuccessfull}
                onExited={() => setToast({ message: '' })} />}
            <h2 className="text-center mt-3 text-uppercase text-white">Manage Users</h2>
            <div className={styles.container}>
                <Button
                    bsPrefix={
                        currentBtn === FilterBtnsKeys.Admins ?
                            styles.filterUsersBtnActive :
                            styles.filterUsersBtn
                    }
                    onClick={() => onFilterBtnClick(FilterBtnsKeys.Admins)}>
                    Show only admins
                </Button>
                <Button
                    bsPrefix={
                        currentBtn === FilterBtnsKeys.Users ?
                            styles.filterUsersBtnActive :
                            styles.filterUsersBtn
                    }
                    onClick={() => onFilterBtnClick(FilterBtnsKeys.Users)}
                >
                    Show only users
                </Button>
                <Button
                    bsPrefix={
                        currentBtn === FilterBtnsKeys.AllUsers ?
                            styles.filterUsersBtnActive :
                            styles.filterUsersBtn
                    }
                    onClick={() => onFilterBtnClick(FilterBtnsKeys.AllUsers)}>
                    Show all
                </Button>
            </div>
            <Table
                responsive
                variant='dark'
                bordered
                hover
                className={styles.table}>
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
                                        <Button
                                            bsPrefix={styles.actionsCellBtn}
                                            onClick={() => handleDeleteModalShow(x._id)}
                                            size='lg'>
                                            Delete
                                        </Button>

                                        <Button
                                            bsPrefix={styles.actionsCellBtn}
                                            size='lg'
                                            onClick={() => handleAdminModalShow(x._id)}>
                                            Change Role
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </>
                    )}
                </tbody>
            </Table>
            <Modal
                className={styles.modal}
                centered
                show={showAdminModal}
                onHide={handleAdminModalClose}>
                <Modal.Header className={styles.modalHeader} closeButton>
                    <Modal.Title>Make User Admin</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    <p>Are you sure you want to make this user an administrator?</p>
                </Modal.Body>
                <div className={`d-grid ${styles.modalBtnContainer}`}>
                    <Button
                        onClick={changeUserRoleHandler}
                        bsPrefix={styles.modalBtn}
                        size="lg">
                        Change User Role
                    </Button>
                </div>
            </Modal>
            <Modal
                className={styles.modal}
                centered
                show={showDeleteModal}
                onHide={handleDeleteModalClose}>
                <Modal.Header className={styles.modalHeader} closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    <p>Are you sure you want to delete this user?</p>
                </Modal.Body>
                <div className={`d-grid ${styles.modalBtnContainer}`}>
                    <Button
                        onClick={deleteUserHandler}
                        bsPrefix={styles.modalBtn}
                        size="lg">
                        Delete User
                    </Button>
                </div>
            </Modal>
            <BackToTopArrow />
        </section>
    )
};

export default ManageUsers;