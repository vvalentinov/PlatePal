import styles from './RecipesSection.module.css';

import RecipeCardLink from '../RecipeCardLink/RecipeCardLink';

import { recipeDetailsPath } from '../../constants/pathNames';

const RecipesSection = ({ recipes, title }) => {
    return (
        <section className={styles.recipesSection}>
            {title && <h2>{title}</h2>}
            <div className={styles.recipesContainer}>
                {recipes.map(recipe => <RecipeCardLink
                    key={recipe._id}
                    recipe={recipe}
                    link={recipeDetailsPath.replace(':recipeId', recipe._id)} />
                )}
            </div>
        </section>
    );
};

export default RecipesSection;