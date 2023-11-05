import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { Controller } from "react-hook-form";

const RecipeYoutubeLink = ({ control, errors }) => {
    return (
        <FloatingLabel controlId="floatingYoutubeLink" label="Youtube Link (optional)" className="mb-4">
            <Controller
                control={control}
                name="recipeYoutubeLink"
                rules={{
                    pattern: { value: /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/, message: 'It must be a valid youtube link!' }
                }}
                render={({ field: { onChange, onBlur } }) =>
                    <Form.Control
                        type='url'
                        className={`${errors.recipeYoutubeLink ? 'border-danger' : 'border-dark'}`}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder="Youtube link here..."
                    />
                } />
            {errors.recipeYoutubeLink && (<p className="text-start text-danger">{errors.recipeYoutubeLink.message}</p>)}
        </FloatingLabel>
    );
};

export default RecipeYoutubeLink;