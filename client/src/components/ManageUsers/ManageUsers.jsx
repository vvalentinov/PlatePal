import styles from './ManageUsers.module.css';

import { useState, useEffect } from 'react';

import { userServiceFactory } from '../../services/userService';
import { useService } from '../../hooks/useService';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const ManageUsers = () => {
    const userService = useService(userServiceFactory);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        userService.getAllUsers()
            .then(res => setUsers(res.result))
            .catch(err => console.log(err.message));
    }, []);

    return (
        <>
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
                                            {!x.isAdmin && <Button size='lg'>Make Admin</Button>}
                                        </td>
                                    </tr>
                                ))}
                            </>
                        )}
                    </tbody>
                </Table>
            </div>
        </>
    )
};

export default ManageUsers;