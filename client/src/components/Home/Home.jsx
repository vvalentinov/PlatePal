import styles from './Home.module.css';

import WelcomeCard from './WelcomeCard/WelcomeCard';
import CreateRecipeCard from './CreateRecipeCard/CreateRecipeCard';
import CreateRecipeCategoryCard from './CreateRecipeCategoryCard/CreateRecipeCategoryCard';

import { AuthContext } from '../../contexts/AuthContext';

import { useContext, useEffect } from 'react';
import BackToTopArrow from '../BackToTopArrow/BackToTopArrow';
import LinkUnapprovedRecipesCard from './LinkUnapprovedRecipesCard/LinkUnapprovedRecipesCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    const { isAuthenticated, isAdmin } = useContext(AuthContext);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
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
                <>
                    <h2 className='text-center'>For Our Admins<FontAwesomeIcon icon={faUser} className='ms-2' /></h2>
                    <section className={styles.adminSection}>
                        <CreateRecipeCategoryCard />
                        <LinkUnapprovedRecipesCard />
                    </section>
                </>
            )}
            <BackToTopArrow />
        </>
    );
};

export default Home;