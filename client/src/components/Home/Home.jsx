import styles from './Home.module.css';

import WelcomeCard from './WelcomeCard/WelcomeCard';

const Home = () => {
    return (
        <>
            <section className={`${styles.homeSection}`}>
                <WelcomeCard />
            </section>
        </>
    );
};

export default Home;