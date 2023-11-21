import styles from './WelcomeCard.module.css';

import Card from 'react-bootstrap/Card';

import { welcomeCardText } from '../../../constants/cardTextMessages';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';

const WelcomeCard = () => {
    return (
        <Card className={styles.welcomeCard}>
            <Card.Header className={styles.welcomeCardHeader}>
                PlatePal<FontAwesomeIcon className='ms-1' icon={faUtensils} />
            </Card.Header>
            <Card.Body className={styles.welcomeCardBody}>
                <Card.Title>Your Culinary Companion</Card.Title>
                <Card.Text>
                    {welcomeCardText}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default WelcomeCard;