import styles from './Home.module.css';

import WelcomeCard from './WelcomeCard/WelcomeCard';
import CreateRecipeCard from './CreateRecipeCard/CreateRecipeCard';
import CreateRecipeCategoryCard from './CreateRecipeCategoryCard/CreateRecipeCategoryCard';
import BackToTopArrow from '../BackToTopArrow/BackToTopArrow';
import LinkUnapprovedRecipesCard from './LinkUnapprovedRecipesCard/LinkUnapprovedRecipesCard';
import ToastNotification from '../Toast/ToastNotification';

import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    const { isAuthenticated, isAdmin } = useContext(AuthContext);

    const { state } = useLocation();

    useEffect(() => window.scrollTo(0, 0), []);

    return (
        <>
            {state && <ToastNotification
                isSuccessfull={state.isSuccessfull}
                message={state.toastMsg}
                onExited={() => window.history.replaceState(null, "")}
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
            <BackToTopArrow />
        </>
    );
};

export default Home;