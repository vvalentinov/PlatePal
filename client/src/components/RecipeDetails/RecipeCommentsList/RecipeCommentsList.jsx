import styles from './RecipeCommentsList.module.css';

import Card from 'react-bootstrap/Card';

import { AuthContext } from '../../../contexts/AuthContext';
import { useContext } from 'react';

import EditCommentBtn from './EditCommentBtn/EditCommentBtn';
import DeleteCommentBtn from './DeleteCommentBtn/DeleteCommentBtn';

const RecipeCommentsList = ({
    comments,
    handleCommentEdit,
    handleCommentDelete,
    recipeId
}) => {
    const { userId } = useContext(AuthContext);

    const formattedDate = (comment) => {
        const dateObj = new Date(comment.createdAt);
        return dateObj.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    };

    return (
        <>
            {comments.map(x => (
                <Card className={styles.card} key={x._id}>
                    <Card.Header className={styles.cardHeader}>
                        {x.user.username} ({formattedDate(x)})
                        {userId && userId === x.user._id && (
                            <div className={styles.cardHeaderContainer}>
                                <EditCommentBtn
                                    handleCommentEdit={handleCommentEdit}
                                    commentId={x._id}
                                    recipeId={recipeId}
                                    text={x.text} />
                                <DeleteCommentBtn
                                    commentId={x._id}
                                    handleCommentDelete={handleCommentDelete} />
                            </div>
                        )}
                    </Card.Header>
                    <Card.Body className={styles.cardBody}>
                        <Card.Text>
                            {x.text}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </>
    );
};

export default RecipeCommentsList;