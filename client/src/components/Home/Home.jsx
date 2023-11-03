import styles from './Home.module.css';

import WelcomeCard from './WelcomeCard/WelcomeCard';
import CreateRecipeCard from './CreateRecipeCard/CreateRecipeCard';

import { AuthContext } from '../../contexts/AuthContext';

import { useContext } from 'react';

const Home = () => {
    const { isAuthenticated } = useContext(AuthContext);

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
        </>
    );
};

export default Home;