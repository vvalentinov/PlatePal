import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { Controller } from "react-hook-form";

import { recipePrepTimeRules } from '../../../utils/errorRules';

const RecipePrepTime = ({ control, errors }) => {
    return (
        <FloatingLabel
            controlId="floatingPrepTimeInput"
            label="Prep Time (minutes)"
            className="mb-4">
            <Controller
                control={control}
                name="recipePrepTime"
                rules={recipePrepTimeRules}
                render={({ field: { onChange, onBlur, value } }) =>
                    <Form.Control
                        min={5}
                        max={1440}
                        autoComplete="on"
                        type="number"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value || ''}
                        placeholder="Recipe Prep Time"
                        className={`${errors.recipePrepTime ? 'border-danger' : 'border-dark'}`}
                    />
                }
            />
            {errors.recipePrepTime && (<p className="text-start text-danger">{errors.recipePrepTime.message}</p>)}
        </FloatingLabel>
    );
};

export default RecipePrepTime;