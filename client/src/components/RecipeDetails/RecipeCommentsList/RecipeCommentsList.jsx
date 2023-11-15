import styles from './RecipeCommentsList.module.css';

import Card from 'react-bootstrap/Card';

import { AuthContext } from '../../../contexts/AuthContext';
import { useContext, useState, useEffect } from 'react';

import EditCommentBtn from './EditCommentBtn/EditCommentBtn';
import DeleteCommentBtn from './DeleteCommentBtn/DeleteCommentBtn';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as regularIcon } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as solidIcon } from '@fortawesome/free-solid-svg-icons';

import { commentServiceFactory } from '../../../services/commentService';
import { useService } from '../../../hooks/useService';

import ToastNotification from '../../Toast/ToastNotification';

const RecipeCommentsList = ({
    comments,
    handleCommentEdit,
    handleCommentDelete,
    recipeId
}) => {
    const [toast, setToast] = useState('');

    const { userId, isAuthenticated } = useContext(AuthContext);

    const commentService = useService(commentServiceFactory);

    const formattedDate = (comment) => {
        const dateObj = new Date(comment.createdAt);
        return dateObj.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    };

    useEffect(() => window.scrollTo(0, 0), [toast]);

    const isCommentLiked = (comment) => comment.likes.includes(userId);

    const onCommentLike = (commentId) => {
        setToast('');

        commentService.like('non-existing')
            .then(res => handleCommentEdit(res.result, commentId))
            .catch(error => setToast(error.message))
            .finnaly(() => setToast(''));
    };

    return (
        <>
            {toast && <ToastNotification isSuccessfull={false} message={toast} />}
            {comments.map(x => (
                <Card className={styles.card} key={x._id}>
                    <Card.Header className={styles.cardHeader}>
                        <div className={styles.commentInfoContainer}>
                            <span>{x.user.username}</span>
                            <span>({formattedDate(x)})</span>
                            <span className={styles.thumbsUpContainer}>
                                <FontAwesomeIcon
                                    size='lg'
                                    onClick={() => {
                                        x.user._id !== userId &&
                                            isAuthenticated &&
                                            onCommentLike(x._id)
                                    }}
                                    className={
                                        (x.user._id === userId || !isAuthenticated) ?
                                            styles.thumbsUpIconAuthor :
                                            styles.thumbsUpIcon}
                                    icon={isCommentLiked(x) ? solidIcon : regularIcon} />
                                ({x.likes.length})
                            </span>
                        </div>
                        {userId && userId === x.user._id && (
                            <div className={styles.commentBtnsContainer}>
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