import styles from './EditRecipeCard.module.css';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { editRecipeCardText } from '../../../constants/cardTextMessages';

import { useNavigate } from 'react-router-dom';

import { editRecipePath } from '../../../constants/pathNames';

const EditRecipeCard = ({ recipeId }) => {
    const navigate = useNavigate();

    const onEditRecipeBtnClick = () => navigate(editRecipePath.replace(':recipeId', recipeId));

    return (
        <Card className={styles.card}>
            <Card.Body>
                <Card.Text>
                    {editRecipeCardText}
                </Card.Text>
                <Button onClick={onEditRecipeBtnClick} bsPrefix={styles.editRecipeBtn}>
                    Edit Recipe
                </Button>
            </Card.Body>
        </Card>
    );
};

export default EditRecipeCard;