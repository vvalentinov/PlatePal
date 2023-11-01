import styles from './Footer.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <footer className={`${styles.footer} fs-3 py-3`}>
            <span>
                &copy; {new Date().getFullYear()}
                <FontAwesomeIcon icon={faMinus} className='mx-2' />
                PlatePal
            </span>
        </footer>
    );
};
export default Footer;