import styles from './UserRecipesList.module.css';

import { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';

import RecipeCardLink from '../RecipeCardLink/RecipeCardLink';
import Spinner from '../Spinner/Spinner';

const UserRecipesList = () => {
    const { token } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/recipe/user-recipes', {
            headers: {
                'X-Authorization': token
            }
        })
            .then(res => res.json())
            .then(res => setRecipes(res.result))
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div className={styles.container}>
            {isLoading && <Spinner />}
            {recipes.map(x => <RecipeCardLink
                key={x._id}
                recipe={x}
                link={`/recipe/details/${x._id}`} />
            )}
        </div>
    );
};

export default UserRecipesList;