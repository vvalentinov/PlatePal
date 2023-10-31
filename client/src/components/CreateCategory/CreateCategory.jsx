import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

import styles from './CreateCategory.module.css';

import { useForm, Controller } from "react-hook-form";

import { useService } from '../../hooks/useService';

import { categoryServiceFactory } from '../../services/categoryService';

import { useNavigate } from 'react-router-dom';

import * as paths from '../../constants/pathNames';
import * as errorMessages from '../../constants/errorMessages';

const CreateCategoryKeys = {
    Name: 'categoryName',
    Description: 'categoryDescription',
    File: 'categoryFile'
};

const CreateCategory = () => {
    const navigate = useNavigate();

    const categoryService = useService(categoryServiceFactory);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ mode: "onBlur" });

    const onFormSubmit = async (data) => {
        const file = data.categoryFile;

        const formData = new FormData();
        formData.append(CreateCategoryKeys.File, file);
        formData.append(CreateCategoryKeys.Name, data.categoryName);
        formData.append(CreateCategoryKeys.Description, data.categoryDescription);

        try {
            await categoryService.create(formData);
            navigate(paths.homePath);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className={styles.container}>
            <Form
                encType="multipart/form-data"
                className="border border-2 border-dark rounded-4 p-4"
                onSubmit={handleSubmit(onFormSubmit)}>
                <h2 className='text-center mb-3'>Create Recipe Category</h2>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Category Name"
                    className="my-4"
                >
                    <Controller
                        control={control}
                        name={CreateCategoryKeys.Name}
                        rules={{ required: errorMessages.categoryNameEmptyError }}
                        render={({ field: { onChange, onBlur } }) => (
                            <Form.Control
                                autoComplete="on"
                                type="text"
                                placeholder="Category"
                                className="border border-dark"
                                onChange={onChange}
                                onBlur={onBlur}
                            />
                        )}
                    />
                    {errors[CreateCategoryKeys.Name] && (
                        <p className={styles.error}>
                            {errors[CreateCategoryKeys.Name].message}
                        </p>)
                    }
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingTextarea2"
                    label="Category Description"
                    className="mb-4"
                >
                    <Controller
                        control={control}
                        name={CreateCategoryKeys.Description}
                        rules={{
                            required: errorMessages.categoryDescriptionEmptyError,
                            minLength: { value: 10, message: errorMessages.categoryDescriptionLengthError },
                            maxLength: { value: 300, message: errorMessages.categoryDescriptionLengthError }
                        }}
                        render={({ field: { onChange, onBlur } }) => (
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '150px' }}
                                className='border border-dark'
                                onChange={onChange}
                                onBlur={onBlur}
                            />
                        )}
                    />
                    {errors[CreateCategoryKeys.Description] && (
                        <p className={styles.error}>
                            {errors[CreateCategoryKeys.Description].message}
                        </p>)
                    }
                </FloatingLabel>
                <Form.Group controlId="formFile" className="mb-4">
                    <Controller
                        control={control}
                        name={CreateCategoryKeys.File}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, ref } }) => (
                            <Form.Control
                                accept=".jpg, .jpeg, .png"
                                type="file"
                                size='lg'
                                className='border border-dark'
                                onChange={(event) => { onChange(event.target.files[0]); }}
                                onBlur={onBlur}
                                ref={ref}
                            />
                        )}
                    />
                    {errors[CreateCategoryKeys.File] && (
                        <p className={styles.error}>
                            {errors[CreateCategoryKeys.File].message}
                        </p>
                    )}
                </Form.Group>
                <div className="d-grid">
                    <Button bsPrefix={styles.formButton} className='rounded-3 py-2 fs-5' size="lg" type="submit">
                        Create
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default CreateCategory;