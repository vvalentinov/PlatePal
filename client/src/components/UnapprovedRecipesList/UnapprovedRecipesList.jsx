import styles from './UnapprovedRecipesList.module.css';

import Spinner from '../Spinner/Spinner';
import RecipeCardLink from '../RecipeCardLink/RecipeCardLink';

import { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';

const UnapprovedRecipesList = () => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { token } = useContext(AuthContext);

    useEffect(() => {
        fetch('http://localhost:3000/recipe/unapproved', {
            headers: { 'X-Authorization': token }
        })
            .then(res => res.json())
            .then(res => setRecipes(res.result))
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <>
            {isLoading ? <Spinner /> : (
                <>
                    <h2 className='text-center'>Unapproved Recipes</h2>
                    <div className={styles.container}>
                        {recipes.map(x => <RecipeCardLink
                            key={x._id}
                            recipe={x}
                            link={`/recipe/details/${x._id}`}
                        />)}
                    </div>
                </>
            )}
        </>
    );
};

export default UnapprovedRecipesList;