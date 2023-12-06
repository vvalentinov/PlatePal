import styles from './Categories.module.css';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';

import CustomSpinner from '../Spinner/Spinner';
import BackToTopArrow from '../BackToTopArrow/BackToTopArrow';
import ToastNotification from '../Toast/ToastNotification';

import { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { categoryServiceFactory } from '../../services/categoryService';
import { useService } from '../../hooks/useService';

import { AuthContext } from '../../contexts/AuthContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { homePath, allRecipesPath, editCategoryPath } from '../../constants/pathNames';

const Categories = () => {
    const navigate = useNavigate();

    const { isAdmin, userLogout } = useContext(AuthContext);

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState('');

    const categoryService = useService(categoryServiceFactory);

    const { state } = useLocation();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (categoryId) => {
        setShow(true);
        setCategoryId(categoryId);
    };

    useEffect(() => {
        categoryService.getAll()
            .then(res => setCategories(res.result))
            .catch(error => {
                if (error.message === 'jwt expired') {
                    userLogout();
                    navigate('/');
                }
            })
            .finally(() => { setIsLoading(false); });
    }, []);

    const onCategoryDelete = () => {
        categoryService.delete(categoryId)
            .then(res => {
                const toast = { message: res.message, isSuccessfull: true };
                navigate(homePath, { state: { toast } });
            }).catch(error => console.log(error.message));
    };

    return (
        <section className={styles.categoriesSection}>
            {state && <ToastNotification
                onExited={() => window.history.replaceState(null, "")}
                message={state.toastMsg}
                isSuccessfull={false} />}
            <h2 className={styles.heading}>
                {
                    isLoading ? 'Category List - Loading...' : `Category List (${categories.length})`
                }
            </h2>
            {isLoading && <CustomSpinner />}
            {categories.map(x => (
                <div key={x._id} className={styles.customContainer}>
                    <div className={styles.container}>
                        <Link className={styles.link} to={allRecipesPath.replace(':category', x.name)}>
                            <Image className={styles.categoryImg} src={x.image.url} fluid={true} />
                        </Link>
                        <Card className={styles.card}>
                            <Card.Header className={styles.cardHeader}>{x.name}</Card.Header>
                            <Card.Body className={styles.cardBody}>
                                <Card.Text className='fs-5'>
                                    {x.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    {isAdmin && (
                        <div className={styles.btnsContainer}>
                            <Link to={editCategoryPath.replace(':categoryId', x._id)}>
                                <Button bsPrefix={styles.categoryBtn}>
                                    Edit {x.name} Category
                                    <FontAwesomeIcon className='ms-2' icon={faUserPen} />
                                </Button>
                            </Link>
                            <Button
                                onClick={() => handleShow(x._id)}
                                bsPrefix={styles.categoryBtn}>
                                Delete {x.name} Category
                                <FontAwesomeIcon className='ms-2' icon={faTrashCan} />
                            </Button>
                        </div>
                    )}
                </div>
            ))}
            <BackToTopArrow />
            <Modal className={styles.modal} centered show={show} onHide={handleClose}>
                <Modal.Header className={styles.modalHeader} closeButton>
                    <Modal.Title>Delete Category</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    <p>Are you sure you want to delete this category?</p>
                </Modal.Body>
                <div className={`d-grid ${styles.modalBtnContainer}`}>
                    <Button onClick={onCategoryDelete} bsPrefix={styles.modalBtn} size="lg">
                        Delete
                    </Button>
                </div>
            </Modal>
        </section>
    );
};

export default Categories;