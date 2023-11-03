import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { Controller } from "react-hook-form";

const RecipeName = ({ control, errors }) => {
    return (
        <FloatingLabel
            controlId="floatingNameInput"
            label="Name"
            className="mb-4">
            <Controller
                control={control}
                name="recipeName"
                rules={{ required: { value: true, message: "Recipe Name is required!" } }}
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
    );
};

export default RecipeName;