import styles from './UserRecipesButton.module.css';

import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faList, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const UserRecipesButton = ({ btnType, recipeType, onClick }) => {
    let title = 'All Recipes';
    let icon = faList;
    if (btnType === 'approved') {
        title = 'Approved Recipes';
        icon = faCircleCheck;
    }
    if (btnType === 'unapproved') {
        title = 'Unapproved Recipes';
        icon = faCircleXmark;
    }

    return (
        <Button
            className={styles.button}
            onClick={() => onClick(btnType)}
            bsPrefix={recipeType === btnType ? styles.activeButton : styles.button}
            size='lg'>
            <FontAwesomeIcon className='me-1' icon={icon} />
            {title}
        </Button>
    );
};

export default UserRecipesButton;