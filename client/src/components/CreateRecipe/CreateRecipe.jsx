import styles from './CreateRecipe.module.css';

import Form from 'react-bootstrap/Form';

import { useForm, useFieldArray } from "react-hook-form";

import { recipeServiceFactory } from '../../services/recipeService';
import { useService } from '../../hooks/useService';

import { useNavigate } from 'react-router-dom';

import * as paths from '../../constants/pathNames';

import RecipeDynamicField from './RecipeDynamicField/RecipeDynamicField';

import FormInput from '../FormInput/FormInput';
import BlockButton from '../BlockButton/BlockButton';

const CreateRecipe = () => {
    const navigate = useNavigate();

    const {
        watch,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ mode: "onBlur" });

    const { fields, append, remove } = useFieldArray({ control, name: "fieldArray" });

    const {
        fields: fieldsList1,
        append: appendList1,
        remove: removeList1 } = useFieldArray({ control, name: "fieldArray1", });

    const watchFieldArray = watch("fieldArray");
    const watchFieldArray1 = watch("fieldArray1");

    const controlledFields = fields.map((field, index) => {
        return {
            ...field,
            ...watchFieldArray[index]
        };
    });

    const controlledFields1 = fieldsList1.map((field, index) => {
        return {
            ...field,
            ...watchFieldArray1[index]
        };
    });

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
            <h2 className="text-center my-4">Create Recipe!</h2>
            <div className={styles.container}>
                <Form
                    method="POST"
                    onSubmit={handleSubmit(onFormSubmit)}
                    className={styles.form}>
                    <FormInput
                        label="Name"
                        name="recipeName"
                        control={control}
                        type="text"
                        placeholder="Recipe Name"
                        className="mb-4"
                        controlId="floatingNameInput" />
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
                    <FormInput
                        name="recipeFile"
                        control={control}
                        errors={errors}
                        type="file"
                        className="mb-4"
                        controlId="formFile" />
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
                        className="mb-4"
                        onClick={() => append({ ingredient: "" })} />
                    {controlledFields1.map((field, index) =>
                        <RecipeDynamicField
                            key={field.id}
                            control={control}
                            name={`recipeStep[${index}]`}
                            index={index}
                            remove={removeList1}
                            placeholder="Step"
                        />)}
                    <BlockButton
                        text="Add Step"
                        onClick={() => appendList1({ name: "" }, {})}
                        className="mb-4"
                        type="button" />
                    <BlockButton
                        text="Create Recipe"
                        className="mb-4"
                        type="submit" />
                </Form>
            </div>
        </>
    );
};

export default CreateRecipe;