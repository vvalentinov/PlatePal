import styles from './Categories.module.css';

import { useEffect, useState } from 'react';

import { categoryServiceFactory } from '../../services/categoryService';
import { useService } from '../../hooks/useService';

import Card from 'react-bootstrap/Card';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    const categoryService = useService(categoryServiceFactory);

    useEffect(() => {
        categoryService.getAll()
            .then(data => setCategories(data))
            .catch(error => console.log(`In error ${error}`));
    }, []);

    return (
        <>
            <h2 className='text-center my-2'>Categories List!</h2>
            {categories.map(x => (
                <div key={x._id} className={styles.container}>
                    <img src={x.image.url} alt="" />
                    <Card className={styles.card}>
                        <Card.Header className={styles.cardHeader}>{x.name}</Card.Header>
                        <Card.Body>
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