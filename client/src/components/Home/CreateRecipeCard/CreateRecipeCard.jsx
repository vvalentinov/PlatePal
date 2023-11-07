import styles from './CreateRecipeCard.module.css';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import * as paths from '../../../constants/pathNames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKitchenSet } from '@fortawesome/free-solid-svg-icons';

const CreateRecipe = () => {
    return (
        <Card className={styles.createRecipeCard}>
            <Card.Header
                className={styles.createRecipeCardHeader}>
                Be the Chef of Your Own Kitchen!<FontAwesomeIcon className='ms-2' icon={faKitchenSet} />
            </Card.Header>
            <Card.Body className={styles.createRecipeCardBody}>
                <Card.Text>
                    At PlatePal, we believe that everyone has a chef inside them waiting to create something amazing. Share your passion for cooking with the world by uploading your unique recipes. Whether it's a family heirloom, a modern twist on a classic, or an experimental fusion, your recipes deserve to shine.

                    Join our culinary community and become a recipe creator today. Inspire others with your culinary masterpieces, and let your creativity take center stage. Your next culinary adventure starts here. Share the flavors of your kitchen with PlatePal!
                </Card.Text>
                <Link className='' to={paths.recipeCreatePath}>
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