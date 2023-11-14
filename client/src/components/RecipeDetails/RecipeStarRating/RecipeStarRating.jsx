import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import styles from './RecipeStarRating.module.css';

import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { useService } from '../../../hooks/useService';
import { ratingServiceFactory } from '../../../services/ratingService';

import useForm from '../../../hooks/useForm';

const RecipeStarRating = ({ recipeId, onRatingSubmit, userRating }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const ratingService = useService(ratingServiceFactory);

    const onFormSubmit = () => {
        ratingService.rateRecipe(recipeId, { rateValue: formValues.ratingBtn })
            .then(res => onRatingSubmit(res.result))
            .catch(error => console.log(error));
    };

    const isRadioSelected = (value) => formValues.ratingBtn === value;

    const {
        formValues,
        onRecipeStarHandler,
        onSubmit } = useForm({
            "ratingBtn": userRating,
            "hover": null
        }, onFormSubmit);

    return (
        <>
            <Button bsPrefix={styles.starButton} onClick={handleShow}>
                Star Recipe<FontAwesomeIcon className='ms-2' icon={faStar} />
            </Button>
            <Modal size='lg' centered show={show} onHide={handleClose}>
                <Modal.Header className={styles.modalHeader} closeButton>
                    <Modal.Title>Give Your Opinion</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmit}>
                    <Modal.Body className={styles.modalBody}>
                        {[...Array(5)].map((star, index) => {
                            const ratingValue = index + 1;
                            return (
                                <label key={index}>
                                    <input
                                        className={styles.radioBtn}
                                        type="radio"
                                        name="ratingBtn"
                                        value={formValues.ratingBtn}
                                        onChange={() => onRecipeStarHandler("ratingBtn", ratingValue)}
                                        checked={isRadioSelected(ratingValue)} />
                                    <FontAwesomeIcon
                                        color={ratingValue <= (formValues.hover || formValues.ratingBtn) ? '#93DC80' : 'white'}
                                        className={styles.starIcon}
                                        icon={faStar}
                                        onMouseEnter={() => onRecipeStarHandler('hover', ratingValue)}
                                        onMouseLeave={() => onRecipeStarHandler('hover', null)} />
                                </label>
                            )
                        })}
                    </Modal.Body>
                    <div className={`d-grid ${styles.buttonContainer}`}>
                        <Button
                            bsPrefix={styles.buttonContainerBtn}
                            onClick={handleClose}
                            type='submit'
                            size="lg">
                            Rate Recipe
                        </Button>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default RecipeStarRating;