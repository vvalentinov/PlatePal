import styles from './LinkUnapprovedRecipesCard.module.css';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

const LinkUnapprovedRecipesCard = () => {
    return (
        <Card className={styles.card}>
            <Card.Body className={styles.cardBody}>
                <Card.Text>
                    Admins, you play a vital role in our culinary community. Your discerning taste and expertise ensure that only the most delectable recipes make it to the plate. As guardians of flavor, you have the power to approve and share the finest culinary creations, enriching the cooking journeys of our users. We appreciate your dedication in curating our recipe collection, making every dish a delightful experience. Keep exploring, approving, and sharing the love for cooking!
                </Card.Text>
                <Link to="/recipe/all/unapproved">
                    <div className="d-grid">
                        <Button bsPrefix={styles.createCategoryButton} size="lg" >
                            Go to unapproved recipes
                        </Button>
                    </div>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default LinkUnapprovedRecipesCard;