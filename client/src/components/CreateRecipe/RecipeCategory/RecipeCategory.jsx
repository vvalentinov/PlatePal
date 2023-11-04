import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { Controller } from "react-hook-form";

const RecipeCategory = ({ control, categories }) => {
    return (
        <Controller
            control={control}
            name="recipeCategory"
            render={({ field: { onChange } }) =>
                <FloatingLabel controlId="floatingSelect" label="Choose recipe category:">
                    <Form.Select
                        name="recipeCategorySelect"
                        onChange={onChange}
                        aria-label="Floating label select example"
                        className="mb-4 border border-dark" size="lg">
                        {categories.map(x => <option value={x._id} key={x._id}>{x.name}</option>)}
                    </Form.Select>
                </FloatingLabel>
            }
        />
    );
};

export default RecipeCategory;