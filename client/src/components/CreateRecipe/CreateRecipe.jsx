import styles from './CreateRecipe.module.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import RecipeName from './RecipeName/RecipeName';
import RecipeCategory from './RecipeCategory/RecipeCategory';
import RecipeImageFile from './RecipeImageFile/RecipeImageFile';
import RecipeDescription from './RecipeDescription/RecipeDescription';
import RecipeCookTime from './RecipeCookTime/RecipeCookTime';
import RecipeIngredients from './RecipeIngredients/RecipeIngredients';
import RecipeYoutubeLink from './RecipeYoutubeLink/RecipeYoutubeLink';

import { useForm } from "react-hook-form";

import { recipeServiceFactory } from '../../services/recipeService';
import { categoryServiceFactory } from '../../services/categoryService';
import { useService } from '../../hooks/useService';

import { useNavigate } from 'react-router-dom';

import * as paths from '../../constants/pathNames';

import useDynamicFieldArray from '../../hooks/useDynamicFieldArray';

import { useEffect, useState } from 'react';
import RecipeSteps from './RecipeSteps/RecipeSteps';

import { extractRecipeFormData } from '../../utils/extractRecipeInfoUtil';

const CreateRecipe = () => {
    const [categories, setCategories] = useState([]);
    const [isRequestInProgress, setIsRequestInProgress] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
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
        setIsRequestInProgress(true);

        const formData = extractRecipeFormData(data);

        try {
            await recipeService.create(formData);
            setIsRequestInProgress(false);
            navigate(paths.homePath);
        } catch (error) {
            setIsRequestInProgress(false);
            console.log(error);
        }
    };

    return (
        <div className={styles.container}>
            <Form method="POST" onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
                <h2 className="text-center my-4">Create Recipe!</h2>

                <RecipeName errors={errors} control={control} />
                <RecipeCategory control={control} categories={categories} />
                <RecipeImageFile control={control} errors={errors} />
                <RecipeDescription control={control} errors={errors} />
                <RecipeYoutubeLink control={control} errors={errors} />
                <RecipeCookTime control={control} errors={errors} />
                <RecipeIngredients errors={errors} control={control} ingredients={ingredients} remove={ingredientsRemove} />

                <div className="d-grid">
                    <Button
                        onClick={() => ingredientsAppend({ name: "" })}
                        type="button"
                        bsPrefix={styles.blockButton}
                        size="lg">
                        Add Recipe Ingredient
                    </Button>
                </div>

                <RecipeSteps errors={errors} control={control} steps={steps} remove={stepsRemove} />

                <div className="d-grid">
                    <Button
                        onClick={() => stepsAppend({ name: "" }, {})}
                        type="button"
                        bsPrefix={styles.blockButton}
                        size="lg">
                        Add Recipe Step
                    </Button>
                </div>

                <div className="d-grid gap-2">
                    {isRequestInProgress ? (
                        <Button disabled bsPrefix={styles.blockButton} size="lg">
                            <Spinner as="span" animation="grow" role="status" aria-hidden="true" />
                            Creating Recipe...
                        </Button>) : (
                        <Button type="submit" bsPrefix={styles.blockButton} size="lg">
                            Create Recipe
                        </Button>)}
                </div>
            </Form>
        </div>
    );
};

export default CreateRecipe;