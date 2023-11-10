import styles from './RecipeCommentsList.module.css';

import Card from 'react-bootstrap/Card';

const RecipeCommentsList = ({ comments }) => {
    return (
        <>
            <h2 className='mb-3'>Comments:</h2>
            {comments.map(x => (
                <Card className={styles.card} key={x._id}>
                    <Card.Header className={styles.cardHeader}>Uploaded by - {x.user.username}</Card.Header>
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