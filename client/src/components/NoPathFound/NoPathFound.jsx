import styles from './NoPathFound.module.css';

import Image from 'react-bootstrap/Image';

const NoPathFound = () => {
    return (
        <div className={styles.imageContainer}>
            <Image className={styles.image} src='/src/assets/images/404.jpg' alt="" />
        </div>
    );
};

export default NoPathFound;