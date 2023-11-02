import styles from './CreateRecipe.module.css';

import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { useForm, Controller } from "react-hook-form";

import { recipeServiceFactory } from '../../services/recipeService';
import { categoryServiceFactory } from '../../services/categoryService';
import { useService } from '../../hooks/useService';

import { useNavigate } from 'react-router-dom';

import * as paths from '../../constants/pathNames';

import RecipeDynamicField from './RecipeDynamicField/RecipeDynamicField';

import BlockButton from '../BlockButton/BlockButton';

import useDynamicFieldArray from '../../hooks/useDynamicFieldArray';

import { useEffect, useState } from 'react';

import { fileRules } from '../../utils/errorRules';

const CreateRecipe = () => {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        categoryService
            .getAll()
            .then(res => setCategories(res))
            .catch(error => console.log(error));
    }, []);

    const {
        watch,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ mode: "onBlur" });

    const {
        controlledFields: ingredients,
        append: ingredientsAppend,
        remove: ingredientsRemove
    } = useDynamicFieldArray(control, 'ingredients', watch);

    const {
        controlledFields: steps,
        append: stepsAppend,
        remove: stepsRemove
    } = useDynamicFieldArray(control, 'steps', watch);

    const recipeService = useService(recipeServiceFactory);
    const categoryService = useService(categoryServiceFactory);

    const onFormSubmit = async (data) => {
        const file = data.recipeFile;

        const formData = new FormData();
        formData.append("recipeFile", file);
        formData.append("recipeName", data.recipeName);
        formData.append("recipeDescription", data.recipeDescription);
        formData.append("recipeCookingTime", data.recipeCookTime);

        try {
            await recipeService.create(formData);
            navigate(paths.homePath);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <div className={styles.container}>
                <Form
                    method="POST"
                    onSubmit={handleSubmit(onFormSubmit)}
                    className={styles.form}>
                    <h2 className="text-center my-4">Create Recipe!</h2>

                    {/* Recipe Name */}
                    <FloatingLabel
                        controlId="floatingNameInput"
                        label="Name"
                        className="mb-4">
                        <Controller
                            control={control}
                            name="recipeName"
                            render={({ field: { onChange, onBlur } }) =>
                                <Form.Control
                                    autoComplete="on"
                                    type="text"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    placeholder="Recipe Name"
                                    className={`${errors.recipeName ? 'border-danger' : 'border-dark'}`}
                                />
                            }
                        />
                        {errors.recipeName && (<p className="text-start text-danger">{errors.recipeName.message}</p>)}
                    </FloatingLabel>

                    {/* Recipe Category */}
                    <FloatingLabel controlId="floatingSelect" label="Choose category:">
                        <Controller
                            control={control}
                            name="recipeCategory"
                            render={({ field: { onChange } }) =>
                                <Form.Select
                                    onChange={onChange}
                                    aria-label="Floating label select example"
                                    className='mb-4 border border-dark' size='lg'>
                                    {categories.map(category => (
                                        <option key={category._id}>{category.name}</option>
                                    ))}
                                </Form.Select>
                            }
                        />
                        {errors.recipeCategory && (<p className="text-start text-danger">{errors.recipeCategory.message}</p>)}
                    </FloatingLabel>

                    {/* Recipe Image File */}
                    <Form.Group controlId="formFile" className="mb-4">
                        <Controller
                            control={control}
                            name="recipeFile"
                            rules={fileRules}
                            render={({ field: { onChange, onBlur } }) => (
                                <Form.Control
                                    accept=".jpg, .jpeg, .png"
                                    type="file"
                                    size='lg'
                                    onChange={(event) => { onChange(event.target.files[0]); }}
                                    onBlur={onBlur}
                                />
                            )}
                        />
                        {errors.recipeFile && (<p className="text-start text-danger">{errors.recipeFile.message}</p>)}
                    </Form.Group>

                    {/* Recipe Description */}
                    <FloatingLabel controlId="floatingTextarea2" label="Description" className="mb-4">
                        <Controller
                            control={control}
                            name="recipeDescription"
                            render={({ field: { onChange, onBlur } }) =>
                                <Form.Control
                                    as="textarea"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    placeholder="Leave a comment here"
                                    style={{ height: '180px' }}
                                />
                            }
                        />
                    </FloatingLabel>

                    {/* Recipe Cook Time */}
                    <FloatingLabel
                        controlId="floatingTimeInput"
                        label="Cook Time (minutes)"
                        className="mb-4">
                        <Controller
                            control={control}
                            name="recipeCookTime"
                            render={({ field: { onChange, onBlur } }) =>
                                <Form.Control
                                    autoComplete="on"
                                    type="text"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    placeholder="Recipe Cook Time"
                                    className={`${errors.recipeCookTime ? 'border-danger' : 'border-dark'}`}
                                />
                            }
                        />
                        {errors.recipeCookTime && (<p className="text-start text-danger">{errors.recipeCookTime.message}</p>)}
                    </FloatingLabel>

                    {/* Recipe Ingredients Array */}
                    {
                        ingredients.map((field, index) =>
                            <RecipeDynamicField
                                key={field.id}
                                control={control}
                                name={`ingredients[${index}]`}
                                index={index}
                                remove={ingredientsRemove}
                                placeholder="Ingredient" />)
                    }

                    {/* Add Ingredient Button */}
                    <BlockButton
                        text="Add Ingredient"
                        type="button"
                        bsPrefix={styles.blockButton}
                        className="mb-4"
                        onClick={() => ingredientsAppend({ ingredient: "" })} />

                    {/* Recipe Steps Array */}
                    {
                        steps.map((field, index) =>
                            <RecipeDynamicField
                                key={field.id}
                                control={control}
                                name={`steps[${index}]`}
                                index={index}
                                remove={stepsRemove}
                                placeholder={`Step ${index + 1}`}
                            />)
                    }

                    {/* Add Step Button */}
                    <BlockButton
                        text="Add Step"
                        onClick={() => stepsAppend({ name: "" }, {})}
                        bsPrefix={styles.blockButton}
                        className="mb-4"
                        type="button" />

                    {/* Submit Form Button */}
                    <BlockButton
                        text="Create Recipe"
                        bsPrefix={styles.blockButton}
                        className="mb-4"
                        type="submit" />
                </Form>
            </div >
        </>
    );
};

export default CreateRecipe;