import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={`${styles.footer} fs-3 py-3`}>
            <span>&copy; {new Date().getFullYear()} - PlatePal</span>
        </footer>
    );
};
export default Footer;