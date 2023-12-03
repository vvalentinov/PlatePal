import styles from './SearchRecipeForm.module.css';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchRecipeForm = ({
    onChange,
    value,
    searchInputText,
    onSubmit,
    error
}) => {
    return (
        <div className={styles.searchContainer}>
            <Form onSubmit={onSubmit} className={styles.searchForm}>
                <InputGroup size='lg'>
                    <Form.Control
                        placeholder={`${searchInputText}`}
                        aria-label={`${searchInputText}`}
                        aria-describedby="basic-addon2"
                        className='border border-2 border-dark'
                        onChange={onChange}
                        value={value}
                        name='search'
                    />
                    <Button type='submit' bsPrefix={styles.searchBtn} id="button-addon2">
                        <FontAwesomeIcon size='lg' icon={faMagnifyingGlass} />
                    </Button>
                </InputGroup>
                {error && <p className='text-start text-danger'>{error}</p>}
            </Form>
        </div>
    );
};

export default SearchRecipeForm;