import styles from './Spinner.module.css';

import Spinner from 'react-bootstrap/Spinner';

const CustomSpinner = () => {
    return (
        <div className={styles.spinnerContainer}>
            <Spinner className={styles.spinner} animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
};

export default CustomSpinner;