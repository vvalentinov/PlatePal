import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { Controller } from "react-hook-form";

import { recipeCookingTimeRules } from '../../../utils/errorRules';

const RecipeCookTime = ({ control, errors }) => {
    return (
        <FloatingLabel
            controlId="floatingTimeInput"
            label="Cook Time (minutes)"
            className="mb-4">
            <Controller
                control={control}
                name="recipeCookTime"
                rules={recipeCookingTimeRules}
                render={({ field: { onChange, onBlur, value } }) =>
                    <Form.Control
                        min={5}
                        max={1440}
                        autoComplete="on"
                        type="number"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value || ''}
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