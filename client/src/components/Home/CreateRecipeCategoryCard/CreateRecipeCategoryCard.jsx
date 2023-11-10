import styles from './CreateRecipeCategoryCard.module.css';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import * as paths from '../../../constants/pathNames';

const CreateRecipeCategoryCard = () => {
    return (
        <Card className={styles.card}>
            <Card.Body className={styles.cardBody}>
                <Card.Text>
                    Welcome to our Recipe Hub! Dive into a world of culinary delights and uncover an extensive assortment of mouthwatering recipes spanning various categories. For our esteemed administrators, you have the special authority to enrich our culinary collection by introducing new recipe categories. To kick-start this journey, head to the create category page. Your contributions will expand our platform, offering a diverse culinary experience for food lovers worldwide.
                </Card.Text>
                <Link to={paths.createCategoryPath}>
                    <div className="d-grid">
                        <Button bsPrefix={styles.createCategoryButton} size="lg" >
                            Create Recipe Category
                        </Button>
                    </div>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default CreateRecipeCategoryCard;