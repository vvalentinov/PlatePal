import styles from './RecipeCommentsSection.module.css';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { AuthContext } from '../../../contexts/AuthContext';
import { useContext, useState, useEffect } from 'react';

import EditCommentBtn from './EditCommentBtn/EditCommentBtn';
import DeleteCommentBtn from './DeleteCommentBtn/DeleteCommentBtn';
import PostRecipeComment from '../PostRecipeComment/PostRecipeComment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as regularIcon } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as solidIcon } from '@fortawesome/free-solid-svg-icons';

import { commentServiceFactory } from '../../../services/commentService';
import { useService } from '../../../hooks/useService';

import { getFormattedDate } from './getFormattedDateUtil';

import NoCommentsCard from '../NoCommentsCard/NoCommentsCard';

const FilterBtnsKeys = {
    ByLikesDesc: 'ByLikesDesc',
    ByDateAsc: 'ByDateAsc',
    ByDateDesc: 'ByDateDesc',
    UserComments: 'UserComments',
};

const RecipeCommentsList = ({ recipeId }) => {
    const commentService = useService(commentServiceFactory, false);
    const commentAuthService = useService(commentServiceFactory);

    const [comments, setComments] = useState([]);
    const [currentBtn, setCurrentBtn] = useState(FilterBtnsKeys.ByDateDesc);
    const [isSpinning, setIsSpinning] = useState(false);

    const { userId, isAuthenticated } = useContext(AuthContext);

    useEffect(() => getSortedCommentsByDateDescHandler(), [recipeId]);

    const isCommentLiked = (comment) => comment.userLikes.includes(userId);

    const onCommentLike = (commentId) => {
        commentAuthService.like(commentId)
            .then(res => setComments(comments =>
                comments.map(x => (x._id === commentId) ? res.result : x)))
            .catch(error => console.log(error.message));
    };

    const onCommentEdit = (newComment, commentId) => setComments(comments =>
        comments.map(x => (x._id === commentId) ? newComment : x));

    const onCommentDelete = (commentId) => setComments(state =>
        state.filter(x => x._id !== commentId));

    const getSortedCommentsByLikesHandler = () => {
        setCurrentBtn(FilterBtnsKeys.ByLikesDesc);
        commentService.getSortedCommentsByLikes(recipeId)
            .then(res => setComments(res.result))
            .catch(error => console.log(error.message));
    };

    const getSortedCommentsByDateAscHandler = () => {
        setCurrentBtn(FilterBtnsKeys.ByDateAsc);
        commentService.getSortedCommentsByDateAsc(recipeId)
            .then(res => setComments(res.result))
            .catch(error => console.log(error.message));
    };

    const getSortedCommentsByDateDescHandler = () => {
        setCurrentBtn(FilterBtnsKeys.ByDateDesc);
        commentService.getAll(recipeId)
            .then(res => setComments(res.result))
            .catch(error => console.log(error.message));
    };

    const getUserCommentsHandler = () => {
        setCurrentBtn(FilterBtnsKeys.UserComments);
        commentAuthService.getUserComments(recipeId)
            .then(res => setComments(res.result))
            .catch(error => console.log(error));
    };

    const onCommentSubmit = (newComment) => setComments((state) => [newComment, ...state]);

    const isCommentAuthor = (commentUserId) => commentUserId === userId || !isAuthenticated;

    return (
        <section id='comments' className={styles.commentsSection}>
            {isAuthenticated &&
                <PostRecipeComment
                    recipeId={recipeId}
                    onCommentSubmit={onCommentSubmit} />
            }
            <div className={styles.container}>
                <Button
                    bsPrefix={
                        currentBtn === FilterBtnsKeys.ByLikesDesc ?
                            styles.sortFilterCommentsBtnActive :
                            styles.sortFilterCommentsBtn
                    }
                    onClick={getSortedCommentsByLikesHandler}>
                    Sort By Likes Desc
                </Button>
                <Button
                    bsPrefix={
                        currentBtn === FilterBtnsKeys.ByDateAsc ?
                            styles.sortFilterCommentsBtnActive :
                            styles.sortFilterCommentsBtn
                    }
                    onClick={getSortedCommentsByDateAscHandler}>
                    Sort By Date Asc
                </Button>
                <Button
                    bsPrefix={
                        currentBtn === FilterBtnsKeys.ByDateDesc ?
                            styles.sortFilterCommentsBtnActive :
                            styles.sortFilterCommentsBtn
                    }
                    onClick={getSortedCommentsByDateDescHandler}>
                    Sort By Date Desc
                </Button>
                {isAuthenticated && (
                    <Button
                        bsPrefix={
                            currentBtn === FilterBtnsKeys.UserComments ?
                                styles.sortFilterCommentsBtnActive :
                                styles.sortFilterCommentsBtn
                        }
                        onClick={getUserCommentsHandler}>
                        Show my comments
                    </Button>
                )}
            </div>
            {comments.length > 0 && (
                <>
                    <h2 className='text-white text-uppercase'>Comments ({comments.length})</h2>
                    {comments.map(x => (
                        <Card className={styles.card} key={x._id}>
                            <Card.Header className={styles.cardHeader}>
                                <div className={styles.commentInfoContainer}>
                                    <span>{x.user.username}</span>
                                    <span>({getFormattedDate(x.createdAt)})</span>
                                    <span className={styles.thumbsUpContainer}>
                                        <FontAwesomeIcon
                                            size='lg'
                                            onClick={() => {
                                                x.user._id !== userId &&
                                                    isAuthenticated &&
                                                    onCommentLike(x._id)
                                            }}
                                            className={isCommentAuthor(x.user._id) ?
                                                styles.thumbsUpIconAuthor :
                                                styles.thumbsUpIcon}
                                            icon={isCommentLiked(x) ? solidIcon : regularIcon} />
                                        ({x.userLikes.length})
                                    </span>
                                </div>
                                {userId && userId === x.user._id && (
                                    <div className={styles.commentBtnsContainer}>
                                        <EditCommentBtn
                                            onCommentEdit={onCommentEdit}
                                            commentId={x._id}
                                            recipeId={recipeId}
                                            text={x.text} />
                                        <DeleteCommentBtn
                                            commentId={x._id}
                                            onCommentDelete={onCommentDelete} />
                                    </div>
                                )}
                            </Card.Header>
                            <Card.Body className={styles.cardBody}>
                                <Card.Text>{x.text}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </>
            )}
            {comments.length === 0 && <NoCommentsCard />}
        </section>
    );
};

export default RecipeCommentsList;