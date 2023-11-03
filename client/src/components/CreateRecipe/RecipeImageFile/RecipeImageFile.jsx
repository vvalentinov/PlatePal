import Form from 'react-bootstrap/Form';

import { Controller } from "react-hook-form";

import { fileRules } from '../../../utils/errorRules';

const RecipeImageFile = ({ control, errors }) => {
    return (
        <Form.Group controlId="formFile" className="mb-4">
            <Controller
                control={control}
                name="recipeFile"
                rules={fileRules}
                render={({ field: { onChange, onBlur } }) => (
                    <Form.Control
                        accept=".jpg, .jpeg, .png"
                        type="file"
                        size='lg'
                        className={`${errors.recipeFile ? 'border-danger' : 'border-dark'}`}
                        onChange={(event) => { onChange(event.target.files[0]); }}
                        onBlur={onBlur}
                    />
                )}
            />
            {errors.recipeFile && (<p className="text-start text-danger">{errors.recipeFile.message}</p>)}
        </Form.Group>
    );
};

export default RecipeImageFile;