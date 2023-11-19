import styles from './CreateRecipeCard.module.css';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import * as paths from '../../../constants/pathNames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKitchenSet } from '@fortawesome/free-solid-svg-icons';

import { createRecipeCardText } from '../../../constants/cardTextMessages';

const CreateRecipe = () => {
    return (
        <Card className={styles.createRecipeCard}>
            <Card.Header
                className={styles.createRecipeCardHeader}>
                Be the Chef of Your Own Kitchen!
                <FontAwesomeIcon className='ms-2' icon={faKitchenSet} />
            </Card.Header>
            <Card.Body className={styles.createRecipeCardBody}>
                <Card.Text>
                    {createRecipeCardText}
                </Card.Text>
                <Link to={paths.recipeCreatePath}>
                    <div className="d-grid">
                        <Button bsPrefix={styles.createRecipeButton} size="lg" >
                            Add Your Own Recipe
                        </Button>
                    </div>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default CreateRecipe;