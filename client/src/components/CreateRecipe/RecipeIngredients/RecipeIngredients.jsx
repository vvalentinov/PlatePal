import { Controller } from "react-hook-form";

import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const RecipeIngredients = ({ ingredients, control, remove }) => {
    return ingredients.map((field, index) => (
        <Controller
            key={field.id}
            control={control}
            name={`ingredients[${index}]`}
            render={({ field: { onChange, onBlur } }) => (
                <InputGroup className="mb-3">
                    <Form.Control
                        name={`ingredients[${index}]`}
                        placeholder="Ingredient"
                        aria-label="Ingredient"
                        aria-describedby="basic-addon2"
                        onChange={onChange}
                        onBlur={onBlur}
                        size="lg"
                    />
                    <Button
                        className="border border-2 border-dark px-2"
                        onClick={() => remove(index)}
                        variant="danger">
                        <FontAwesomeIcon className="px-3" size="2x" icon={faTrashCan} />
                    </Button>
                </InputGroup>
            )}
        />
    ));
};

export default RecipeIngredients;