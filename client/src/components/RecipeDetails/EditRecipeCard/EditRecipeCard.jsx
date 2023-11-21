import styles from './EditRecipeCard.module.css';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { editRecipeCardText } from '../../../constants/cardTextMessages';

import { Link } from 'react-router-dom';

const EditRecipeCard = ({ recipeId }) => {
    return (
        <Card className={styles.card}>
            <Card.Body>
                <Card.Text>
                    {editRecipeCardText}
                </Card.Text>
                <Button bsPrefix={styles.editRecipeBtn}>
                    <Link to={`/recipe/edit/${recipeId}`}>Edit Recipe</Link>
                </Button>
            </Card.Body>
        </Card>
    );
};

export default EditRecipeCard;