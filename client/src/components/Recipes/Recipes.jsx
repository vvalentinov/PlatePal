import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';

import styles from './Recipes.module.css';

const Recipes = () => {
    const { category } = useParams();
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/recipe/all/${category}`)
            .then(res => res.json())
            .then(res => setRecipes(res.result))
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            <div className={styles.container}>
                {recipes.map(x => (
                    <Link key={x._id} className={styles.recipeLink} to={`/recipe/details/${x._id}`}>
                        <Card className={styles.recipeCard}>
                            <Card.Img variant="top" src={x.image.url} />
                            <Card.Body className={styles.recipeCardBody}>
                                <Card.Title className={styles.recipeCardTitle}>{x.name}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Recipes;