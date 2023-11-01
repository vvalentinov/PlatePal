import styles from './CreateRecipe.module.css';

import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

import { useForm, Controller } from "react-hook-form";

import { recipeServiceFactory } from '../../services/recipeService';
import { useService } from '../../hooks/useService';

const CreateRecipe = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ mode: "onBlur" });

    const recipeService = useService(recipeServiceFactory);

    const onFormSubmit = (data) => {
        console.log(data);
    };

    return (
        <>
            <h2 className="text-center my-4">Create Recipe!</h2>
            <div className={styles.container}>
                <Form
                    method="POST"
                    onSubmit={handleSubmit(onFormSubmit)}
                    className={styles.form}
                >
                    <FloatingLabel
                        controlId="floatingNameInput"
                        label="Name"
                        className="mb-4"
                    >
                        <Controller
                            control={control}
                            name="recipeName"
                            render={({ field: { onChange, onBlur } }) => (
                                <Form.Control
                                    autoComplete="on"
                                    type="text"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    placeholder="Recipe Name"
                                />
                            )}
                        />
                    </FloatingLabel>
                    <FloatingLabel className='mb-4' controlId="floatingTextarea2" label="Description">
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '180px' }}
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Cook Time (minutes)"
                        className="mb-4"
                    >
                        <Controller
                            control={control}
                            name="recipeCookTime"
                            render={({ field: { onChange, onBlur } }) => (
                                <Form.Control
                                    type="number"
                                    min={1}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    placeholder="Recipe Cook Time"
                                />
                            )}
                        />
                    </FloatingLabel>
                    <Form.Group controlId="formFile" className="mb-4">
                        <Controller
                            control={control}
                            name="imageFile"
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, ref } }) => (
                                <Form.Control
                                    accept=".jpg, .jpeg, .png"
                                    type="file"
                                    size='lg'
                                    onChange={(event) => { onChange(event.target.files[0]); }}
                                    onBlur={onBlur}
                                    ref={ref}
                                />
                            )}
                        />
                    </Form.Group>
                    <div className="d-grid gap-2 mb-4">
                        <Button type="submit" variant="primary" size="lg">
                            Create Recipe
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default CreateRecipe;