import styles from './RecipeCardLink.module.css';

import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

const RecipeCardLink = ({ recipe, link }) => {
    return (
        <Link className={styles.recipeLink} to={link}>
            <Card className={styles.recipeCard}>
                <Card.Img variant="top" src={recipe.image.url} />
                <Card.Body className={styles.recipeCardBody}>
                    <Card.Title className={styles.recipeCardTitle}>
                        {recipe.name}
                    </Card.Title>
                </Card.Body>
            </Card>
        </Link>
    );
};

export default RecipeCardLink;