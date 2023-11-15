import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

import styles from './CreateCategory.module.css';

import { useService } from '../../hooks/useService';

import { categoryServiceFactory } from '../../services/categoryService';

import { useNavigate } from 'react-router-dom';

import * as paths from '../../constants/pathNames';

import useForm from '../../hooks/useForm';

import { useState } from 'react';

import * as validator from '../../utils/validatorUtil';

const CreateCategoryKeys = {
    Name: 'categoryName',
    Description: 'categoryDescription',
    File: 'categoryFile'
};

const CreateCategory = () => {
    const navigate = useNavigate();

    const categoryService = useService(categoryServiceFactory);

    const [errors, setErrors] = useState({
        CategoryNameError: '',
        CategoryDescriptionError: '',
        CategoryFileError: ''
    });

    const onFormSubmit = async (data) => {
        const categoryNameErr = validator.categoryNameValidator(formValues[CreateCategoryKeys.Name]);
        const categoryDescriptionErr = validator.categoryDescriptionValidator(formValues[CreateCategoryKeys.Description]);
        const categoryFileErr = validator.categoryFileValidator(formValues[CreateCategoryKeys.File]);

        if (categoryNameErr || categoryDescriptionErr || categoryFileErr) {
            setErrors({
                CategoryNameError: categoryNameErr,
                CategoryDescriptionError: categoryDescriptionErr,
                CategoryFileError: categoryFileErr
            });

            return;
        }

        const formData = new FormData();
        formData.append(CreateCategoryKeys.File, data.categoryFile);
        formData.append(CreateCategoryKeys.Name, data.categoryName);
        formData.append(CreateCategoryKeys.Description, data.categoryDescription);

        try {
            await categoryService.create(formData);
            navigate(paths.homePath);
        } catch (error) {
            console.log(error.message);
        }
    };

    const onCategoryNameBlur = () => {
        setErrors(state => ({
            ...state,
            CategoryNameError: validator.categoryNameValidator(formValues[CreateCategoryKeys.Name])
        }));
    };

    const onCategoryDescriptionBlur = () => {
        setErrors(state => ({
            ...state,
            CategoryDescriptionError: validator.categoryDescriptionValidator(formValues[CreateCategoryKeys.Description])
        }));
    };

    const onCategoryFileBlur = () => {
        setErrors(state => ({
            ...state,
            CategoryFileError: validator.categoryFileValidator(formValues[CreateCategoryKeys.File])
        }));
    };

    const {
        formValues,
        onChangeHandler,
        onFileChangeHandler,
        onSubmit
    } = useForm({
        [CreateCategoryKeys.Name]: '',
        [CreateCategoryKeys.Description]: '',
        [CreateCategoryKeys.File]: null
    }, onFormSubmit);

    return (
        <div className={styles.container}>
            <Form encType="multipart/form-data" className="rounded-4 p-4" onSubmit={onSubmit}>
                <h2 className='text-center mb-3'>Create Recipe Category</h2>
                <FloatingLabel controlId="floatingInput" label="Category Name" className="my-4">
                    <Form.Control
                        name={CreateCategoryKeys.Name}
                        onChange={onChangeHandler}
                        value={formValues[CreateCategoryKeys.Name]}
                        onBlur={onCategoryNameBlur}
                        autoComplete="on"
                        type="text"
                        placeholder="Category"
                        className={errors.CategoryNameError ? styles.formControlError : styles.formControl}
                    />
                    {errors.CategoryNameError && <p className='text-start text-danger'>{errors.CategoryNameError}</p>}
                </FloatingLabel>
                <FloatingLabel controlId="floatingTextarea2" label="Category Description" className="mb-4">
                    <Form.Control
                        name={CreateCategoryKeys.Description}
                        onChange={onChangeHandler}
                        onBlur={onCategoryDescriptionBlur}
                        value={formValues[CreateCategoryKeys.Description]}
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '150px' }}
                        className={errors.CategoryDescriptionError ? styles.formControlError : styles.formControl}
                    />
                    {errors.CategoryDescriptionError && <p className='text-start text-danger'>{errors.CategoryDescriptionError}</p>}
                </FloatingLabel>
                <Form.Group controlId="formFile" className="mb-4">
                    <Form.Control
                        name={CreateCategoryKeys.File}
                        onChange={onFileChangeHandler}
                        onBlur={onCategoryFileBlur}
                        value={formValues[CreateCategoryKeys.Form]}
                        accept=".jpg, .jpeg, .png"
                        type="file"
                        size='lg'
                        className={errors.CategoryFileError ? styles.formControlError : styles.formControl}
                    />
                    {errors.CategoryFileError && <p className='text-start text-danger'>{errors.CategoryFileError}</p>}
                </Form.Group>
                <div className="d-grid">
                    <Button bsPrefix={styles.formButton} className='rounded-3 py-2' size="lg" type="submit">
                        Create
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default CreateCategory;