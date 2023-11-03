import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { Controller } from "react-hook-form";

const RecipeDescription = ({ control, errors }) => {
    return (
        <FloatingLabel controlId="floatingTextarea2" label="Description" className="mb-4">
            <Controller
                control={control}
                name="recipeDescription"
                rules={{ required: { value: true, message: "Recipe Description is required!" } }}
                render={({ field: { onChange, onBlur } }) =>
                    <Form.Control
                        className={`${errors.recipeDescription ? 'border-danger' : 'border-dark'}`}
                        as="textarea"
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder="Leave a comment here"
                        style={{ height: '180px' }}
                    />
                } />
            {errors.recipeDescription && (<p className="text-start text-danger">{errors.recipeDescription.message}</p>)}
        </FloatingLabel>
    );
};

export default RecipeDescription;