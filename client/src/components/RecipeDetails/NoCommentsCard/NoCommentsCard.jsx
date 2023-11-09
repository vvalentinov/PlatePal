import styles from './NoCommentsCard.module.css';

import Card from 'react-bootstrap/Card';

const NoCommentsSection = () => {
    return (
        <Card className={styles.card}>
            <Card.Header className={styles.cardHeader}>No Comments yet...</Card.Header>
            <Card.Body>
                <Card.Text>
                    Be the first to leave a comment and share your thoughts about this delicious recipe! Your feedback is valuable and can help others make the most of their culinary experience. Feel free to leave a comment and let us know your tips, variations, or any questions you may have. We're looking forward to hearing from you and building a vibrant cooking community around this wonderful recipe.
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default NoCommentsSection;
