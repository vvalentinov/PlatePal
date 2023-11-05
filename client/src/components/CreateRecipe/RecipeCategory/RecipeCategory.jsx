import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { Controller } from "react-hook-form";

const RecipeCategory = ({ control, categories }) => {
    return (
        <Controller
            control={control}
            defaultValue="65401b02d8d0bf670e9b90b9"
            name="recipeCategory"
            render={({ field: { onChange, value } }) =>
                <FloatingLabel controlId="floatingSelect" label="Choose recipe category:">
                    <Form.Select
                        onChange={onChange}
                        value={value}
                        aria-label="Floating label select example"
                        className="mb-4 border border-dark"
                        size="lg">
                        {categories.map(x => <option value={x._id} key={x._id}>{x.name}</option>)}
                    </Form.Select>
                </FloatingLabel>
            }
        />
    );
};

export default RecipeCategory;