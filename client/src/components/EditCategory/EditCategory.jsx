import styles from './EditCategory.module.css';

import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useService } from '../../hooks/useService';
import { categoryServiceFactory } from '../../services/categoryService';
import {
    categoryNameValidator,
    categoryDescriptionValidator,
    categoryEditFileValidator
} from '../../utils/validatorUtil';

import * as paths from '../../constants/pathNames';

import BackToTopArrow from '../BackToTopArrow/BackToTopArrow';

import ToastNotification from '../Toast/ToastNotification';

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
    const [toastMsg, setToastMsg] = useState('');
    const [image, setImage] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const { categoryId } = useParams();

    useEffect(() => {
        categoryService.getById(categoryId)
            .then(res => {
                setFormValues(state => ({
                    ...state,
                    [EditCategoryKeys.Name]: res.result.name,
                    [EditCategoryKeys.Description]: res.result.description
                }));
                setImageUrl(res.result.image.url);
            })
            .catch(error => setToastMsg(error.message))
            .finally(() => window.scrollTo(0, 0));
    }, [categoryId]);

    const onFormSubmit = async (e) => {
        e.preventDefault();

        const categoryNameErr = categoryNameValidator(formValues[EditCategoryKeys.Name]);
        const categoryDescriptionErr = categoryDescriptionValidator(formValues[EditCategoryKeys.Description]);
        const categoryFileErr = categoryEditFileValidator(formValues[EditCategoryKeys.File]);

        if (categoryNameErr || categoryDescriptionErr || categoryFileErr) {
            return setErrors({
                CategoryNameError: categoryNameErr,
                CategoryDescriptionError: categoryDescriptionErr,
                CategoryFileError: categoryFileErr
            });
        }

        setIsEditing(true);

        const formData = new FormData();
        formData.append(EditCategoryKeys.File, formValues[EditCategoryKeys.File]);
        formData.append(EditCategoryKeys.Name, formValues[EditCategoryKeys.Name]);
        formData.append(EditCategoryKeys.Description, formValues[EditCategoryKeys.Description]);

        try {
            await categoryService.edit(categoryId, formData);
            setIsEditing(false);
            const toast = { message: 'Successfully edited category!', isSuccessfull: true };
            navigate(paths.homePath, { state: { toast } });
        } catch (error) {
            setIsEditing(false);
            setToastMsg(error.message);
            window.scrollTo(0, 0);
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

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result);
            reader.readAsDataURL(file);
        } else {
            setImage('');
        }
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
        <>
            {toastMsg && <ToastNotification
                onExited={() => setToastMsg('')}
                message={toastMsg}
                isSuccessfull={false} />}
            <div className={styles.container}>
                <Form encType="multipart/form-data" className="rounded-4 p-4" onSubmit={onFormSubmit}>
                    <h2>Edit Category</h2>
                    <div className={styles.imgContainer}>
                        {imageUrl && <img src={imageUrl} />}
                    </div>
                    <FloatingLabel controlId="floatingInput" label="Category Name" className="my-4">
                        <Form.Control
                            name={EditCategoryKeys.Name}
                            onChange={onCategoryNameChange}
                            value={formValues[EditCategoryKeys.Name]}
                            onBlur={onCategoryNameBlur}
                            autoComplete="on"
                            type="text"
                            placeholder="Category"
                            className={
                                errors.CategoryNameError ?
                                    styles.formControlError :
                                    styles.formControl}
                        />
                        {errors.CategoryNameError &&
                            <p className='text-start text-danger'>{errors.CategoryNameError}</p>}
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingTextarea2" label="Category Description" className="mb-4">
                        <Form.Control
                            name={EditCategoryKeys.Description}
                            onChange={onCategoryDescriptionChange}
                            onBlur={onCategoryDescriptionBlur}
                            value={formValues[EditCategoryKeys.Description]}
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '250px' }}
                            className={
                                errors.CategoryDescriptionError ?
                                    styles.formControlError :
                                    styles.formControl}
                        />
                        {errors.CategoryDescriptionError &&
                            <p className='text-start text-danger'>{errors.CategoryDescriptionError}</p>}
                    </FloatingLabel>
                    <Form.Group controlId="formFile" className="mb-4">
                        <Form.Control
                            name={EditCategoryKeys.File}
                            onChange={(event) => {
                                handleFileChange(event);
                                onFileChangeHandler(event);
                            }}
                            onBlur={onCategoryFileBlur}
                            accept=".jpg, .jpeg, .png"
                            type="file"
                            size='lg'
                            className={
                                errors.CategoryFileError ?
                                    styles.formControlError :
                                    styles.formControl}
                        />
                        {errors.CategoryFileError &&
                            <p className='text-start text-danger'>{errors.CategoryFileError}</p>}
                        {image && !errors.recipeFile && (
                            <div className={`${styles.imgContainer} mt-3`}>
                                <img src={image} alt="Preview" style={{
                                    width: '50%',
                                    maxHeight: '400px',
                                    borderRadius: '15px'
                                }} />
                            </div>
                        )}
                    </Form.Group>
                    <div className="d-grid">
                        <Button
                            bsPrefix={styles.formButton}
                            className='rounded-3 py-2'
                            size="lg"
                            type="submit">
                            {isEditing ? 'Editing Category...' : 'Edit'}
                        </Button>
                    </div>
                </Form>
                <BackToTopArrow />
            </div>
        </>
    )
};

export default EditCategory;