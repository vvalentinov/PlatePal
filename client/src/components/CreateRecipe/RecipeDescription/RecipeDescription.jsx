import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { Controller } from "react-hook-form";

import { recipeDescriptionRules } from '../../../utils/errorRules';

const RecipeDescription = ({ control, errors }) => {
    return (
        <FloatingLabel controlId="floatingTextarea2" label="Description" className="mb-4">
            <Controller
                control={control}
                name="recipeDescription"
                rules={recipeDescriptionRules}
                render={({ field: { onChange, onBlur, value } }) =>
                    <Form.Control
                        as="textarea"
                        className={`${errors.recipeDescription ? 'border-danger' : 'border-dark'}`}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value || ''}
                        placeholder="Leave a comment here"
                        style={{ height: '250px', fontSize: '1.5rem' }}
                    />
                } />
            {errors.recipeDescription && (<p className="text-start text-danger">{errors.recipeDescription.message}</p>)}
        </FloatingLabel>
    );
};

export default RecipeDescription;