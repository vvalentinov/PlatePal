import styles from './EditRecipe.module.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import RecipeName from '../CreateRecipe/RecipeName/RecipeName';
import RecipeCategory from '../CreateRecipe/RecipeCategory/RecipeCategory';
import RecipeImageFile from '../CreateRecipe/RecipeImageFile/RecipeImageFile';
import RecipeDescription from '../CreateRecipe/RecipeDescription/RecipeDescription';
import RecipeCookTime from '../CreateRecipe/RecipeCookTime/RecipeCookTime';
import RecipePrepTime from '../CreateRecipe/RecipePrepTime/RecipePrepTime';
import RecipeServings from '../CreateRecipe/RecipeServings/RecipeServings';
import RecipeIngredients from '../CreateRecipe/RecipeIngredients/RecipeIngredients';
import RecipeSteps from '../CreateRecipe/RecipeSteps/RecipeSteps';
import RecipeYoutubeLink from '../CreateRecipe/RecipeYoutubeLink/RecipeYoutubeLink';

import { useForm } from "react-hook-form";

import { recipeServiceFactory } from '../../services/recipeService';
import { useService } from '../../hooks/useService';

import { useNavigate, useParams } from 'react-router-dom';

import * as paths from '../../constants/pathNames';

import useDynamicFieldArray from '../../hooks/useDynamicFieldArray';

import { useEffect, useState } from 'react';

import { extractRecipeFormData } from '../../utils/extractRecipeInfoUtil';

import ToastNotification from '../Toast/ToastNotification'

import BackToTopArrow from '../BackToTopArrow/BackToTopArrow';

const EditRecipe = () => {
    const [categories, setCategories] = useState([]);
    const [preselectedCategory, setPreselectedCategory] = useState({});
    const [isRequestInProgress, setIsRequestInProgress] = useState(false);
    const [toastMsg, setToastMsg] = useState('');

    const recipeService = useService(recipeServiceFactory);

    // const [recipe, setRecipe] = useState({});

    const { recipeId } = useParams();
    const navigate = useNavigate();

    const {
        watch,
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm({
        mode: "onBlur",
        defaultValues: {},
    });

    useEffect(() => {
        recipeService.getEditDetails(recipeId)
            .then(res => {
                setPreselectedCategory(res.result[2].preselectedCategory);
                setCategories(res.result[1].categories);
                reset({
                    recipeName: res.result[0].recipe.name,
                    recipeCategory: res.result[2].preselectedCategory.category._id,
                    recipeDescription: res.result[0].recipe.description,
                    recipeYoutubeLink: res.result[0].recipe.youtubeLink,
                    recipeCookTime: res.result[0].recipe.cookingTime,
                    recipePrepTime: res.result[0].recipe.prepTime,
                    recipeServings: res.result[0].recipe.servings,
                    ingredients: res.result[0].recipe.ingredients.map(x => ({ name: x })),
                    steps: res.result[0].recipe.steps.map(x => ({ name: x }))
                });
            }).catch(err => console.log(err));

        window.scrollTo(0, 0);
    }, [recipeId]);

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

    const onFormSubmit = async (data) => {
        setToastMsg('');
        setIsRequestInProgress(true);

        const formData = extractRecipeFormData(data);

        try {
            const result = await recipeService.edit(recipeId, formData);
            setIsRequestInProgress(false);
            const toast = { toastMsg: result.message, isSuccessfull: true };

            navigate(`/recipe/details/${recipeId}`, { state: toast });
        } catch (error) {
            setIsRequestInProgress(false);
            setToastMsg(error.message);
            window.scrollTo(0, 0);
        }
    };


    return (
        <div className={styles.container}>
            <Form method="POST" onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
                <h2 className={styles.heading}>Edit Recipe</h2>

                {/* <img src={recipe.image.url} /> */}

                <RecipeName errors={errors} control={control} />
                <RecipeCategory
                    selectedCategory={preselectedCategory}
                    control={control}
                    categories={categories}
                />
                <RecipeImageFile control={control} errors={errors} />
                <RecipeDescription control={control} errors={errors} />
                <RecipeYoutubeLink control={control} errors={errors} />
                <RecipeCookTime control={control} errors={errors} />
                <RecipePrepTime control={control} errors={errors} />
                <RecipeServings control={control} errors={errors} />
                <RecipeIngredients
                    errors={errors}
                    control={control}
                    ingredients={ingredients}
                    remove={ingredientsRemove} />

                <div className="d-grid">
                    <Button
                        onClick={() => ingredientsAppend({ name: "" })}
                        type="button"
                        bsPrefix={styles.blockButton}
                        size="lg">
                        Add Recipe Ingredient
                    </Button>
                </div>

                <RecipeSteps
                    errors={errors}
                    control={control}
                    steps={steps}
                    remove={stepsRemove}
                />

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
                            Editing Recipe...
                        </Button>) : (
                        <Button type="submit" bsPrefix={styles.blockButton} size="lg">
                            Edit Recipe
                        </Button>)}
                </div>
            </Form>
            <BackToTopArrow />
        </div>
    )
};

export default EditRecipe;