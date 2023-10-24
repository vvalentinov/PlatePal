import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={`mt-auto fs-3 py-3 d-flex  justify-content-center align-items-center ${styles.footer} text-white`}>
            <span>&copy; {new Date().getFullYear()} - PlatePal</span>
        </footer>
    );
};
export default Footer;