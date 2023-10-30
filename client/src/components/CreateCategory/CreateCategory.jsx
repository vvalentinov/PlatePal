import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

import styles from './CreateCategory.module.css';

import { useForm, Controller } from "react-hook-form";

const CreateCategory = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ mode: "onBlur" });

    const onFormSubmit = (data) => {
        const file = data.categoryFile;

        const dataToBeSent = new FormData();
        dataToBeSent.append('file', file);
        dataToBeSent.append('categoryName', data.categoryName);
        dataToBeSent.append('categoryDescription', data.categoryDescription);

        fetch("http://localhost:3000/category/create", {
            method: 'POST',
            body: dataToBeSent,
        })
            .then(res => res.json())
            .then(res => console.log(res));
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
                    {errors.categoryName && <p className="error">{errors.categoryName.message}</p>}
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
                    {errors.categoryDescription && <p className="error">{errors.categoryDescription.message}</p>}
                </FloatingLabel>
                <Form.Group controlId="formFile" className="mb-4">
                    <Form.Label>Choose category image</Form.Label>
                    {/* Category File */}
                    <Controller
                        control={control}
                        name="categoryFile"
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, ref } }) => (
                            <Form.Control
                                name='categoryFile'
                                type="file"
                                size='lg'
                                className='border border-dark'
                                onChange={(event) => { onChange(event.target.files[0]); }}
                            />
                        )}
                    />
                    {errors.categoryFile && <p className="error">File is required!</p>}
                </Form.Group>
                <div className="d-grid">
                    <Button variant="dark" size="lg" type="submit">
                        Create Recipe
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default CreateCategory;