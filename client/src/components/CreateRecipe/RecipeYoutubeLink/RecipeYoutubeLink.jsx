import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { Controller } from "react-hook-form";

import styles from './RecipeYoutubeLink.module.css';

import { recipeYoutubeLinkRules } from '../../../utils/errorRules';

const RecipeYoutubeLink = ({ control, errors }) => {
    return (
        <>
            <div className={styles.container}>
                <p>Provide embedded youtube video link (optional)! If you don't know how: <a href="https://www.youtube.com/watch?v=kiyi-C7NQrQ&ab_channel=RichardByrne" target='blank'>Check This Video</a></p>
            </div>
            <FloatingLabel controlId="floatingYoutubeLink" label="Youtube Link (optional)" className="mb-4">
                <Controller
                    control={control}
                    name="recipeYoutubeLink"
                    rules={recipeYoutubeLinkRules}
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
        </>
    );
};

export default RecipeYoutubeLink;