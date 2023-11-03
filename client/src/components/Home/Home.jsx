import styles from './Home.module.css';

import Card from 'react-bootstrap/Card';

const Home = () => {
    return (
        <>
            <section className={`${styles.homeSection}`}>
                <Card className={styles.welcomeCard}>
                    <Card.Header className={styles.welcomeCardHeader}>PlatePal</Card.Header>
                    <Card.Body>
                        <Card.Title>Your Culinary Companion</Card.Title>
                        <Card.Text>
                            Discover a world of culinary delights with PlatePal. Whether you're a seasoned chef or a kitchen novice, our platform has something for everyone. Browse a vast collection of mouthwatering recipes, from classic favorites to exotic dishes.

                            Join our passionate community of food enthusiasts, where you can share your own culinary creations and connect with fellow foodies. Explore user-generated content, leave comments, and get inspired to try new recipes.

                            PlatePal is your one-stop destination for all things food. Start your gastronomic journey today and turn your kitchen into a culinary paradise. Bon appétit!
                        </Card.Text>
                        {/* <Button variant="primary">Go somewhere</Button> */}
                    </Card.Body>
                </Card>

            </section>
            {/* <div>
                <p>fdsfsd</p>
            </div> */}
        </>
    );
};

export default Home;