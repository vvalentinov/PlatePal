import Form from 'react-bootstrap/Form';

import { Controller } from "react-hook-form";

import { useState } from 'react';

import { fileRules, editRecipeFileRules } from '../../../utils/errorRules';

const RecipeImageFile = ({ control, errors, isEdit }) => {
    const [image, setImage] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result);
            reader.readAsDataURL(file);
        } else {
            setImage('');
        }
    };

    return (
        <Form.Group controlId="formFile" className="mb-4">
            <Controller
                control={control}
                name="recipeFile"
                rules={isEdit ? editRecipeFileRules : fileRules}
                render={({ field: { onChange, onBlur } }) => (
                    <Form.Control
                        accept=".jpg, .jpeg, .png"
                        type="file"
                        size='lg'
                        className={`${errors.recipeFile ? 'border-danger' : 'border-dark'}`}
                        onChange={(event) => {
                            handleFileChange(event);
                            onChange(event.target.files[0]);
                        }}
                        // onChange={(event) => { onChange(event.target.files[0]); }}
                        onBlur={onBlur}
                    />
                )}
            />
            {errors.recipeFile && (<p className="text-start text-danger">{errors.recipeFile.message}</p>)}

            {/* Display the image preview */}
            {image && !errors.recipeFile && (
                <div className="mt-2">
                    <img src={image} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                </div>
            )}
        </Form.Group>
    );
};

export default RecipeImageFile;