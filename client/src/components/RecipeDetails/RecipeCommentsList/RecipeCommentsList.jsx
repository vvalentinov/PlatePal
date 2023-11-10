import styles from './RecipeCommentsList.module.css';

import Card from 'react-bootstrap/Card';

const RecipeCommentsList = ({ comments }) => {
    return (
        <>
            {comments.map(x => (
                <Card className={styles.card} key={x._id}>
                    <Card.Header className={styles.cardHeader}>Author - {x.user.username}</Card.Header>
                    <Card.Body className={styles.cardBody}>
                        <Card.Text>
                            {x.text}
                        </Card.Text>
                    </Card.Body>
                </Card>)
            )}
        </>
    );
};

export default RecipeCommentsList;