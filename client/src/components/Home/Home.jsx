import styles from './Home.module.css';

import WelcomeCard from './WelcomeCard/WelcomeCard';
import CreateRecipeCard from './CreateRecipeCard/CreateRecipeCard';
import CreateRecipeCategoryCard from './CreateRecipeCategoryCard/CreateRecipeCategoryCard';
import BackToTopArrow from '../BackToTopArrow/BackToTopArrow';
import RecipesSection from '../RecipesSection/RecipesSection';
import LinkUnapprovedRecipesCard from './LinkUnapprovedRecipesCard/LinkUnapprovedRecipesCard';
import ToastNotification from '../Toast/ToastNotification';

import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { recipeServiceFactory } from '../../services/recipeService';
import { useService } from '../../hooks/useService';
import { AuthContext } from '../../contexts/AuthContext';

const Home = () => {
    const { state } = useLocation();

    const [recentRecipes, setRecentRecipes] = useState([]);
    const [topRatedRecipes, setTopRatedRecipes] = useState([]);
    const [toast, setToast] = useState({
        message: state?.message,
        isSuccessfull: state?.isSuccessfull
    });

    const recipeService = useService(recipeServiceFactory, false);

    const { isAuthenticated, isAdmin } = useContext(AuthContext);

    useEffect(() => {
        recipeService.getMostRecent()
            .then(res => setRecentRecipes(res.result))
            .catch(error => setToast({ message: error.message, isSuccessfull: false }));

        recipeService.getTopRated()
            .then(res => setTopRatedRecipes(res.result))
            .catch(error => setToast({ message: error.message, isSuccessfull: false }));

        window.scrollTo(0, 0);
    }, []);

    return (
        <section className={styles.homeSection}>
            {toast.message && <ToastNotification
                isSuccessfull={toast.isSuccessfull}
                message={toast.message}
                onExited={() => {
                    setToast({ message: '', isSuccessfull: false });
                    window.history.replaceState({}, document.title);
                }}
            />}
            <section className={`${styles.heroSection}`}>
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
                    <h2>For Our Admins<FontAwesomeIcon icon={faUser} className='ms-2' />
                    </h2>
                    <div className={styles.adminContainer}>
                        <CreateRecipeCategoryCard />
                        <LinkUnapprovedRecipesCard />
                    </div>
                </section>
            )}
            {recentRecipes && (
                <RecipesSection recipes={recentRecipes} title='Recent Recipes' />
            )}
            {topRatedRecipes && (
                <RecipesSection recipes={topRatedRecipes} title='Top Rated Recipes' />
            )}
            <BackToTopArrow />
        </section>
    );
};

export default Home;