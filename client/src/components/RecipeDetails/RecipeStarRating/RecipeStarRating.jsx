import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import styles from './RecipeStarRating.module.css';

import { useState, useContext } from 'react';

import { AuthContext } from '../../../contexts/AuthContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const RecipeStarRating = ({ recipeId, onRatingSubmit }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    const { token } = useContext(AuthContext);

    const isRadioSelected = (value) => rating === value;
    const onRadioChange = (e) => setRating(e.target.value);

    const onFormSubmit = (e) => {
        e.preventDefault();

        const rateValue = Number(rating);

        fetch(`http://localhost:3000/rating/rate-recipe/${recipeId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token,
            },
            body: JSON.stringify({ rateValue })
        })
            .then(res => res.json())
            .then(res => onRatingSubmit(res.result))
            .catch(error => console.log(error));
    };

    return (
        <>
            <Button
                bsPrefix={styles.starButton}
                onClick={handleShow}>
                Star Recipe<FontAwesomeIcon className='ms-2' icon={faStar} />
            </Button>
            <Modal size='lg' centered show={show} onHide={handleClose}>
                <Modal.Header className={styles.modalHeader} closeButton>
                    <Modal.Title>Give Your Opinion</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onFormSubmit}>
                    <Modal.Body className={styles.modalBody}>
                        {[...Array(5)].map((star, index) => {
                            const ratingValue = index + 1;
                            return (
                                <label key={index}>
                                    <input
                                        className={styles.radioBtn}
                                        type="radio"
                                        name="ratingBtn"
                                        value={ratingValue}
                                        onChange={onRadioChange}
                                        checked={isRadioSelected(ratingValue)} />
                                    <FontAwesomeIcon
                                        color={ratingValue <= (hover || rating) ? '#93DC80' : 'white'}
                                        className={styles.starIcon}
                                        icon={faStar}
                                        onMouseEnter={() => setHover(ratingValue)}
                                        onMouseLeave={() => setHover(null)} />
                                </label>
                            )
                        })}
                    </Modal.Body>
                    <div className={`d-grid gap-2 ${styles.buttonContainer}`}>
                        <Button bsPrefix={styles.buttonContainerBtn} onClick={handleClose} type='submit' size="lg">
                            Rate Recipe
                        </Button>
                    </div>
                </Form>
            </Modal>
        </>
    );
};
export default RecipeStarRating;

