import styles from './Spoonacular.module.css';

import Card from 'react-bootstrap/Card';

import SearchRecipeForm from '../SearchRecipeForm/SearchRecipeForm';
import BackToTopArrow from '../BackToTopArrow/BackToTopArrow';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import useForm from '../../hooks/useForm';
import { searchForRecipes } from '../../services/spoonacularService';

const Spoonacular = () => {
    const [recipes, setRecipes] = useState([]);

    const onFormSubmit = async (data) => {
        const query = data.search;
        const result = await searchForRecipes(query);
        setRecipes(result);
    };

    const {
        formValues,
        onChangeHandler,
        onSubmit
    } = useForm({ 'search': '' }, onFormSubmit);


    return (
        <section>
            <h2 className="text-center text-white text-uppercase mt-3">
                Welcome to spoonacular API!
            </h2>
            <SearchRecipeForm
                onSubmit={onSubmit}
                onChange={onChangeHandler}
                value={formValues.query}
                searchInputText='Search for recipe...'
            />
            {recipes?.length > 0 && (
                <section className={styles.recipesSection}>
                    <div className={styles.recipesContainer}>
                        {
                            recipes.map(recipe =>
                                <Link key={recipe.id} className={styles.recipeLink} to='/'>
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