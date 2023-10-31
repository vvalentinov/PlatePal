import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

import styles from './CreateCategory.module.css';

import { useForm, Controller } from "react-hook-form";

import { AuthContext } from '../../contexts/AuthContext';

import { useContext } from 'react';

import { categoryServiceFactory } from '../../services/categoryService';

import { useNavigate } from 'react-router-dom';

import * as paths from '../../constants/pathNames';

const CreateCategory = () => {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);

    const categoryService = categoryServiceFactory(token);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ mode: "onBlur" });

    const onFormSubmit = async (data) => {
        const file = data.categoryFile;

        const dataToBeSent = new FormData();
        dataToBeSent.append('file', file);
        dataToBeSent.append('categoryName', data.categoryName);
        dataToBeSent.append('categoryDescription', data.categoryDescription);

        try {
            const result = await categoryService.create(dataToBeSent);
            navigate(paths.homePath);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className={styles.container}>
            <Form encType="multipart/form-data" className="border border-2 border-dark rounded-4 p-4" onSubmit={handleSubmit(onFormSubmit)}>
                <h2 className='text-center mb-3'>Create Recipe Category</h2>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Category Name"
                    className="my-4"
                >
                    {/* Category Name */}
                    <Controller
                        control={control}
                        name="categoryName"
                        rules={{ required: 'Category Name is required!' }}
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                                autoComplete="on"
                                type="text"
                                placeholder="Category"
                                className="border border-dark"
                                onChange={onChange}
                                onBlur={onBlur}
                                ref={ref}
                            />
                        )}
                    />
                    {errors.categoryName && <p className={styles.error}>{errors.categoryName.message}</p>}
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingTextarea2"
                    label="Category Description"
                    className="mb-4"
                >
                    {/* Category Description */}
                    <Controller
                        control={control}
                        name="categoryDescription"
                        rules={{ required: 'Category Description is required!' }}
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '150px' }}
                                className='border border-dark'
                                onChange={onChange}
                                onBlur={onBlur}
                                ref={ref}
                            />
                        )}
                    />
                    {errors.categoryDescription && <p className={styles.error}>{errors.categoryDescription.message}</p>}
                </FloatingLabel>
                <Form.Group controlId="formFile" className="mb-4">
                    {/* Category File */}
                    <Controller
                        control={control}
                        name="categoryFile"
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, ref } }) => (
                            <Form.Control
                                accept=".jpg, .jpeg, .png"
                                name='categoryFile'
                                type="file"
                                size='lg'
                                className='border border-dark'
                                onChange={(event) => { onChange(event.target.files[0]); }}
                                onBlur={onBlur}
                                ref={ref}
                            />
                        )}
                    />
                    {errors.categoryFile && <p className={styles.error}>{errors.categoryFile.message}</p>}
                </Form.Group>
                <div className="d-grid">
                    <Button bsPrefix={styles.formButton} className='rounded-3 py-2 fs-5' size="lg" type="submit">
                        Create Recipe
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default CreateCategory;