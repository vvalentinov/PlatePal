import styles from './Home.module.css';

import WelcomeCard from './WelcomeCard/WelcomeCard';
import CreateRecipeCard from './CreateRecipeCard/CreateRecipeCard';
import CreateRecipeCategoryCard from './CreateRecipeCategoryCard/CreateRecipeCategoryCard';
import BackToTopArrow from '../BackToTopArrow/BackToTopArrow';
import LinkUnapprovedRecipesCard from './LinkUnapprovedRecipesCard/LinkUnapprovedRecipesCard';
import ToastNotification from '../Toast/ToastNotification';

import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../contexts/AuthContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { recipeServiceFactory } from '../../services/recipeService';
import { useService } from '../../hooks/useService';

import RecipeCardLink from '../RecipeCardLink/RecipeCardLink';

const Home = () => {
    const [recentRecipes, setRecentRecipes] = useState([]);
    const [topRatedRecipes, setTopRatedRecipes] = useState([]);
    const [toast, setToast] = useState({ message: '', isSuccessfull: false });

    const recipeService = useService(recipeServiceFactory);

    const { isAuthenticated, isAdmin } = useContext(AuthContext);

    useEffect(() => {
        recipeService.getMostRecent()
            .then(res => setRecentRecipes(res.result))
            .catch(error => setToast({ message: error.message, isSuccessfull: false }));

        recipeService.getTopRated()
            .then(res => setTopRatedRecipes(res.result))
            .catch(error => setToast({ message: error.message, isSuccessfull: false }));
    }, []);

    return (
        <>
            {toast.message && <ToastNotification
                isSuccessfull={toast.isSuccessfull}
                message={toast.message}
                onExited={() => setToast({ message: '', isSuccessfull: false })}
            />}
            <section className={`${styles.homeSection}`}>
                <WelcomeCard />
            </section>
            {isAuthenticated && (
                <section className={styles.createRecipeSection}>
                    <img src='/src/assets/images/recipe.png' alt="" />
                    <CreateRecipeCard />
                </section>
            )}
            {isAdmin && (
                <section className={styles.adminSection}>
                    <h2>
                        For Our Admins
                        <FontAwesomeIcon icon={faUser} className='ms-2' />
                    </h2>
                    <div className={styles.adminContainer}>
                        <CreateRecipeCategoryCard />
                        <LinkUnapprovedRecipesCard />
                    </div>
                </section>
            )}
            {recentRecipes && (
                <section className={styles.recipesSection}>
                    <h2>Recent Recipes</h2>
                    <div className={styles.recipesContainer}>
                        {recentRecipes.map(recipe => <RecipeCardLink
                            key={recipe._id}
                            recipe={recipe}
                            link={`/recipe/details/${recipe._id}`} />
                        )}
                    </div>
                </section>
            )}
            {topRatedRecipes && (
                <section className={styles.recipesSection}>
                    <h2>Top Rated Recipes</h2>
                    <div className={styles.recipesContainer}>
                        {topRatedRecipes.map(recipe => <RecipeCardLink
                            key={recipe._id}
                            recipe={recipe}
                            link={`/recipe/details/${recipe._id}`} />
                        )}
                    </div>
                </section>
            )}
            <BackToTopArrow />
        </>
    );
};

export default Home;