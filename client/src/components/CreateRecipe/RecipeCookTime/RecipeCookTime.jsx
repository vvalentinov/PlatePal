import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { Controller } from "react-hook-form";

const RecipeCookTime = ({ control, errors }) => {
    return (
        <FloatingLabel
            controlId="floatingTimeInput"
            label="Cook Time (minutes)"
            className="mb-4">
            <Controller
                control={control}
                name="recipeCookTime"
                rules={{ required: { value: true, message: "Recipe Cook Time is required!" } }}
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
    );
};

export default RecipeCookTime;