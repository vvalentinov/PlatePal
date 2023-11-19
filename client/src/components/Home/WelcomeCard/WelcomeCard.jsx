import styles from './WelcomeCard.module.css';

import Card from 'react-bootstrap/Card';

import { welcomeCardText } from '../../../constants/cardTextMessages';

const WelcomeCard = () => {
    return (
        <Card className={styles.welcomeCard}>
            <Card.Header className={styles.welcomeCardHeader}>PlatePal</Card.Header>
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