import styles from './Categories.module.css';

import { useEffect, useState } from 'react';

import { categoryServiceFactory } from '../../services/categoryService';
import { useService } from '../../hooks/useService';

import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const categoryService = useService(categoryServiceFactory);

    useEffect(() => {
        categoryService.getAll()
            .then(data => {
                setCategories(data);
            })
            .catch(error => console.log(`In error ${error}`))
            .finally(() => { setIsLoading(false); });
    }, []);

    return (
        <>
            <h2 className='text-center my-2'>{
                isLoading ? 'Category List - Loading...' : 'Category List'
            }</h2>
            {isLoading && (
                <div className={styles.spinnerContainer}>
                    <Spinner className={styles.spinner} animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}
            {categories.map(x => (
                <div key={x._id} className={styles.container}>
                    <img src={x.image.url} alt="" />
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
        </>
    );
};

export default Categories;