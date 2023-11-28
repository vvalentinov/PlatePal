import styles from './Categories.module.css';

import Card from 'react-bootstrap/Card';

import CustomSpinner from '../Spinner/Spinner';
import BackToTopArrow from '../BackToTopArrow/BackToTopArrow';
import ToastNotification from '../Toast/ToastNotification';

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { categoryServiceFactory } from '../../services/categoryService';
import { useService } from '../../hooks/useService';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const categoryService = useService(categoryServiceFactory);

    const { state } = useLocation();

    useEffect(() => {
        categoryService.getAll()
            .then(res => setCategories(res.result))
            .catch(error => console.log(`In error ${error}`))
            .finally(() => { setIsLoading(false); });
    }, []);

    return (
        <>
            {state && <ToastNotification
                onExited={() => window.history.replaceState(null, "")}
                message={state.toastMsg}
                isSuccessfull={false} />}
            <section className={styles.categoriesSection}>
                <h2 className={styles.heading}>
                    {
                        isLoading ? 'Category List - Loading...' : `Category List (${categories.length})`
                    }
                </h2>
                {isLoading && <CustomSpinner />}
                {categories.map(x => (
                    <div key={x._id} className={styles.container}>
                        <div className={styles.imageContainer}>
                            <Link className={styles.link} to={`/recipe/all/${x.name}`}>
                                <img className={styles.categoryImg} src={x.image.url} alt="" />
                            </Link>
                        </div>
                        <Card className={styles.card}>
                            <Card.Header className={styles.cardHeader}>{x.name}</Card.Header>
                            <Card.Body className={styles.cardBody}>
                                <Card.Text className='fs-5'>
                                    {x.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
                <BackToTopArrow />
            </section>
        </>
    );
};

export default Categories;