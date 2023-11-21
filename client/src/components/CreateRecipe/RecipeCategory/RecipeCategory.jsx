import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { Controller } from "react-hook-form";

const RecipeCategory = ({ control, categories, selectedCategory }) => {
    return (
        <Controller
            control={control}
            name="recipeCategory"
            render={({ field: { onChange, value } }) =>
                <FloatingLabel controlId="floatingSelect" label="Choose recipe category:">
                    <Form.Select
                        onChange={onChange}
                        value={value || ''}
                        aria-label="Floating label select example"
                        className="mb-4 border border-dark"
                        size="lg">
                        {selectedCategory ? (
                            <>
                                <option value={selectedCategory.category?._id}>
                                    {selectedCategory.category?.name}
                                </option>
                                {categories.map(x => <option value={x._id} key={x._id}>{x.name}</option>)}
                            </>
                        ) : (
                            <>
                                {categories.map(x => <option value={x._id} key={x._id}>{x.name}</option>)}
                            </>
                        )}
                    </Form.Select>
                </FloatingLabel>
            }
        />
    );
};

export default RecipeCategory;