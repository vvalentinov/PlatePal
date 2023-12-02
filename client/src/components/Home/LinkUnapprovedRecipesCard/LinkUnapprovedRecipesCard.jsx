import styles from './LinkUnapprovedRecipesCard.module.css';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import { unapprovedRecipesPath } from '../../../constants/pathNames';

import { unapprovedRecipesLinkCardText } from '../../../constants/cardTextMessages';

const LinkUnapprovedRecipesCard = () => {
    return (
        <Card className={styles.card}>
            <Card.Body className={styles.cardBody}>
                <Card.Text>
                    {unapprovedRecipesLinkCardText}
                </Card.Text>
                <Link to={unapprovedRecipesPath}>
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