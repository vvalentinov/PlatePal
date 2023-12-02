import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { Controller } from "react-hook-form";

import { recipeNameRules } from '../../../constants/errorRules';

const RecipeName = ({ control, errors }) => {
    return (
        <FloatingLabel controlId="floatingNameInput" label="Name" className="mb-4">
            <Controller
                control={control}
                name="recipeName"
                rules={recipeNameRules}
                render={({ field: { onChange, onBlur, value } }) =>
                    <Form.Control
                        autoComplete="on"
                        type="text"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value || ''}
                        placeholder="Recipe Name"
                        className={`${errors.recipeName ? 'border-danger' : 'border-dark'}`}
                    />
                }
            />
            {errors.recipeName && (<p className="text-start text-danger">{errors.recipeName.message}</p>)}
        </FloatingLabel>
    );
};

export default RecipeName;