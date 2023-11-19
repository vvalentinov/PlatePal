import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { Controller } from "react-hook-form";

import { recipeServingsRules } from '../../../utils/errorRules';

const RecipeServings = ({ control, errors }) => {
    return (
        <FloatingLabel
            controlId="floatingServingsInput"
            label="Servings"
            className="mb-4">
            <Controller
                control={control}
                name="recipeServings"
                rules={recipeServingsRules}
                render={({ field: { onChange, onBlur } }) =>
                    <Form.Control
                        min={1}
                        max={100}
                        autoComplete="on"
                        type="number"
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder="Recipe Servings"
                        className={`${errors.recipeServings ? 'border-danger' : 'border-dark'}`}
                    />
                }
            />
            {errors.recipeServings && (<p className="text-start text-danger">{errors.recipeServings.message}</p>)}
        </FloatingLabel>
    );
};

export default RecipeServings;