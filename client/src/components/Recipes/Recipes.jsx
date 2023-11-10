import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import RecipeCardLink from '../RecipeCardLink/RecipeCardLink';

import styles from './Recipes.module.css';

const Recipes = () => {
    const { category } = useParams();

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/recipe/all/${category}`)
            .then(res => res.json())
            .then(res => setRecipes(res.result))
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            <div className={styles.container}>
                {recipes.map(x => <RecipeCardLink
                    key={x._id}
                    recipe={x}
                    link={`/recipe/details/${x._id}`} />
                )}
            </div>
        </>
    );
};

export default Recipes;