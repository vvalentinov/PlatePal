import styles from './CreateRecipe.module.css';

import Form from 'react-bootstrap/Form';

import { useForm } from "react-hook-form";

import { recipeServiceFactory } from '../../services/recipeService';
import { useService } from '../../hooks/useService';

import { useNavigate } from 'react-router-dom';

import * as paths from '../../constants/pathNames';

import RecipeDynamicField from './RecipeDynamicField/RecipeDynamicField';

import FormInput from '../FormInput/FormInput';
import BlockButton from '../BlockButton/BlockButton';

import useDynamicFieldArray from '../../hooks/useDynamicFieldArray';

const CreateRecipe = () => {
    const navigate = useNavigate();

    const {
        watch,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ mode: "onBlur" });

    const { controlledFields, append, remove } = useDynamicFieldArray(control, 'ingredients', watch);
    const {
        controlledFields: steps,
        append: stepsAppend,
        remove: stepsRemove,
    } = useDynamicFieldArray(control, 'steps', watch);

    const recipeService = useService(recipeServiceFactory);

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
                    <FormInput
                        label="Name"
                        name="recipeName"
                        control={control}
                        type="text"
                        placeholder="Recipe Name"
                        className="mb-4"
                        controlId="floatingNameInput" />
                    <FormInput
                        name="recipeFile"
                        control={control}
                        errors={errors}
                        type="file"
                        className="mb-4"
                        controlId="formFile" />
                    <FormInput
                        label="Description"
                        name="recipeDescription"
                        control={control}
                        type="textarea"
                        placeholder="Leave a comment here"
                        className="mb-4"
                        controlId="floatingTextarea2" />
                    <FormInput
                        label="Cook Time (minutes)"
                        name="recipeCookTime"
                        control={control}
                        type="number"
                        placeholder="Recipe Cook Time"
                        className="mb-4"
                        controlId="floatingTimeInput" />
                    {controlledFields.map((field, index) =>
                        <RecipeDynamicField
                            key={field.id}
                            control={control}
                            name={`recipeIngredient[${index}]`}
                            index={index}
                            remove={remove}
                            placeholder="Ingredient"
                        />)}
                    <BlockButton
                        text="Add Ingredient"
                        type="button"
                        bsPrefix={styles.blockButton}
                        className="mb-4"
                        onClick={() => append({ ingredient: "" })} />
                    {steps.map((field, index) =>
                        <RecipeDynamicField
                            key={field.id}
                            control={control}
                            name={`recipeStep[${index}]`}
                            index={index}
                            remove={stepsRemove}
                            placeholder="Step"
                        />)}
                    <BlockButton
                        text="Add Step"
                        onClick={() => stepsAppend({ name: "" }, {})}
                        bsPrefix={styles.blockButton}
                        className="mb-4"
                        type="button" />
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