import styles from './NoRecipesCard.module.css';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { useNavigate } from 'react-router-dom';

import { recipeCreatePath } from '../../../constants/pathNames';
import { noRecipesInCategoryText } from '../../../constants/cardTextMessages';

const NoRecipesCard = () => {
    const navigate = useNavigate();

    const onBtnClick = () => navigate(recipeCreatePath);

    return (
        <Card className={styles.card}>
            <Card.Body>
                <Card.Text>{noRecipesInCategoryText}</Card.Text>
                <Button onClick={onBtnClick} bsPrefix={styles.button}>
                    Go To Create Recipe Page
                </Button>
            </Card.Body>
        </Card >
    );
};

export default NoRecipesCard;