import styles from './EditCategory.module.css';

import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useService } from '../../hooks/useService';
import { categoryServiceFactory } from '../../services/categoryService';
import {
    categoryNameValidator,
    categoryDescriptionValidator,
    categoryEditFileValidator
} from '../../utils/validatorUtil';

import * as paths from '../../constants/pathNames';

const EditCategoryKeys = {
    Name: 'categoryName',
    Description: 'categoryDescription',
    File: 'categoryFile'
};

const EditCategory = () => {
    const navigate = useNavigate();

    const categoryService = useService(categoryServiceFactory);

    const [formValues, setFormValues] = useState({
        [EditCategoryKeys.Name]: '',
        [EditCategoryKeys.Description]: ''
    });

    const [errors, setErrors] = useState({
        CategoryNameError: '',
        CategoryDescriptionError: '',
        CategoryFileError: ''
    });

    const [imageUrl, setImageUrl] = useState('');

    const { categoryId } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/category/get-category/${categoryId}`)
            .then(res => res.json())
            .then(res => {
                setFormValues(state => ({
                    ...state,
                    [EditCategoryKeys.Name]: res.result.name,
                    [EditCategoryKeys.Description]: res.result.description
                }));
                setImageUrl(res.result.image.url);
            })
            .catch(err => console.log(err));
    }, [categoryId]);

    const onFormSubmit = async (e) => {
        e.preventDefault();

        const categoryNameErr = categoryNameValidator(formValues[EditCategoryKeys.Name]);
        const categoryDescriptionErr = categoryDescriptionValidator(formValues[EditCategoryKeys.Description]);
        const categoryFileErr = categoryEditFileValidator(formValues[EditCategoryKeys.File]);

        if (categoryNameErr || categoryDescriptionErr || categoryFileErr) {
            setErrors({
                CategoryNameError: categoryNameErr,
                CategoryDescriptionError: categoryDescriptionErr,
                CategoryFileError: categoryFileErr
            });

            return;
        }

        const formData = new FormData();
        formData.append(EditCategoryKeys.File, formValues[EditCategoryKeys.File]);
        formData.append(EditCategoryKeys.Name, formValues[EditCategoryKeys.Name]);
        formData.append(EditCategoryKeys.Description, formValues[EditCategoryKeys.Description]);

        try {
            await categoryService.edit(categoryId, formData);
            navigate(paths.homePath);
        } catch (error) {
            console.log(error.message);
        }
    };

    const onCategoryNameChange = (e) => setFormValues(state =>
        ({ ...state, [EditCategoryKeys.Name]: e.target.value }));

    const onCategoryDescriptionChange = (e) => setFormValues(state =>
        ({ ...state, [EditCategoryKeys.Description]: e.target.value }));

    const onFileChangeHandler = (e) => {
        const { name, files } = e.target;
        setFormValues((state) => ({ ...state, [name]: files[0] }));
    };

    const onCategoryNameBlur = () => {
        setErrors(state => ({
            ...state,
            CategoryNameError: categoryNameValidator(formValues[EditCategoryKeys.Name])
        }));
    };

    const onCategoryDescriptionBlur = () => {
        setErrors(state => ({
            ...state,
            CategoryDescriptionError: categoryDescriptionValidator(formValues[EditCategoryKeys.Description])
        }));
    };

    const onCategoryFileBlur = () => {
        setErrors(state => ({
            ...state,
            CategoryFileError: categoryEditFileValidator(formValues[EditCategoryKeys.File])
        }));
    };

    return (
        <div className={styles.container}>
            <Form encType="multipart/form-data" className="rounded-4 p-4" onSubmit={onFormSubmit}>
                <h2 className='text-center mb-3'>Edit Recipe Category</h2>
                {imageUrl && <img src={imageUrl} />}
                <FloatingLabel controlId="floatingInput" label="Category Name" className="my-4">
                    <Form.Control
                        name={EditCategoryKeys.Name}
                        onChange={onCategoryNameChange}
                        value={formValues[EditCategoryKeys.Name]}
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
                        name={EditCategoryKeys.Description}
                        onChange={onCategoryDescriptionChange}
                        onBlur={onCategoryDescriptionBlur}
                        value={formValues[EditCategoryKeys.Description]}
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '150px' }}
                        className={errors.CategoryDescriptionError ? styles.formControlError : styles.formControl}
                    />
                    {errors.CategoryDescriptionError && <p className='text-start text-danger'>{errors.CategoryDescriptionError}</p>}
                </FloatingLabel>
                <Form.Group controlId="formFile" className="mb-4">
                    <Form.Control
                        name={EditCategoryKeys.File}
                        onChange={onFileChangeHandler}
                        onBlur={onCategoryFileBlur}
                        accept=".jpg, .jpeg, .png"
                        type="file"
                        size='lg'
                        className={errors.CategoryFileError ? styles.formControlError : styles.formControl}
                    />
                    {errors.CategoryFileError && <p className='text-start text-danger'>{errors.CategoryFileError}</p>}
                </Form.Group>
                <div className="d-grid">
                    <Button bsPrefix={styles.formButton} className='rounded-3 py-2' size="lg" type="submit">
                        Edit
                    </Button>
                </div>
            </Form>
        </div>
    )
};

export default EditCategory;