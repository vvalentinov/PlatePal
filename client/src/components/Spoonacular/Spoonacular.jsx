import styles from './Spoonacular.module.css';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import BackToTopArrow from '../BackToTopArrow/BackToTopArrow';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import useForm from '../../hooks/useForm';
import { searchForRecipes } from '../../services/spoonacularService';

const Spoonacular = () => {
    const [recipes, setRecipes] = useState([]);

    const onFormSubmit = async (data) => {
        const query = data.search;
        try {
            const result = await searchForRecipes(query);
            setRecipes(result);
        } catch (error) {
            console.log(error.message);
        }
    };

    const {
        formValues,
        onChangeHandler,
        onSubmit
    } = useForm({ 'search': '' }, onFormSubmit);

    return (
        <section>
            <h2 className="text-center text-white text-uppercase mt-5">
                Welcome to spoonacular API!
            </h2>
            <div className={styles.searchContainer}>
                <Form onSubmit={onSubmit} className={styles.searchForm}>
                    <InputGroup size='lg'>
                        <Form.Control
                            placeholder={'Search for recipe...'}
                            aria-label={'Search for recipe...'}
                            aria-describedby="basic-addon2"
                            className='border border-2 border-dark'
                            onChange={onChangeHandler}
                            value={formValues.search}
                            name='search'
                        />
                        <Button type='submit' bsPrefix={styles.searchBtn} id="button-addon2">
                            <FontAwesomeIcon size='lg' icon={faMagnifyingGlass} />
                        </Button>
                    </InputGroup>
                </Form>
            </div>
            {recipes?.length > 0 && (
                <section className={styles.recipesSection}>
                    <div className={styles.recipesContainer}>
                        {
                            recipes.map(recipe =>
                                <Link
                                    key={recipe.id}
                                    className={styles.recipeLink}
                                    to={`/spoonacular-recipe-details/${recipe.id}`}>
                                    <Card className={styles.recipeCard}>
                                        <Card.Img variant="top" src={recipe.image} />
                                        <Card.Body className={styles.recipeCardBody}>
                                            <Card.Title className={styles.recipeCardTitle}>
                                                {recipe.title}
                                            </Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            )}
                    </div>
                </section>
            )}
            <BackToTopArrow />
        </section>
    );
};

export default Spoonacular;