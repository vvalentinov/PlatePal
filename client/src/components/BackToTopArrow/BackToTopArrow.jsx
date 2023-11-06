import styles from './BackToTopArrow.module.css';

import { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';

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
                <button
                    style={
                        {
                            position: 'fixed',
                            bottom: '100px',
                            right: '50px',
                            height: '50px',
                            width: '50px',
                            fontSize: '4rem',
                            border: 'none',
                            background: 'none',
                        }
                    }
                    onClick={scrollUp}>
                    <FontAwesomeIcon icon={faCircleUp}
                        style={{
                            color: "#93DC80",
                            // backgroundColor: "red"
                        }} />
                </button>
            )}
        </>
    );
};



export default BackToTopArrow;