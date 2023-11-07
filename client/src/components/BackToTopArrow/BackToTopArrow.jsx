import styles from './BackToTopArrow.module.css';

import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUp } from '@fortawesome/free-solid-svg-icons';

const BackToTopArrow = () => {
    const [backToTopButton, setBackToTopButton] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                setBackToTopButton(true);
            } else {
                setBackToTopButton(false);
            }
        });
    }, []);

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {backToTopButton && (
                <button className={styles.button} onClick={scrollUp}>
                    <FontAwesomeIcon className={styles.icon} icon={faCircleUp} />
                </button>
            )}
        </>
    );
};



export default BackToTopArrow;