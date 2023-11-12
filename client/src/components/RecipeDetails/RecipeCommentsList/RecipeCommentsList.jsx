import styles from './RecipeCommentsList.module.css';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { AuthContext } from '../../../contexts/AuthContext';
import { useContext } from 'react';

import EditCommentBtn from './EditCommentBtn/EditCommentBtn';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import DeleteCommentBtn from './DeleteCommentBtn/DeleteCommentBtn';

const RecipeCommentsList = ({
    comments,
    handleCommentEdit,
    handleCommentDelete,
    recipeId
}) => {
    const { userId } = useContext(AuthContext);

    return (
        <>
            {comments.map(x => (
                <Card className={styles.card} key={x._id}>
                    <Card.Header className={styles.cardHeader}>
                        Author - {x.user.username}
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