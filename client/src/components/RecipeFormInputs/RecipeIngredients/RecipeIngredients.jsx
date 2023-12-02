import { Controller } from "react-hook-form";

import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { recipeIngredientRules } from "../../../constants/errorRules";

const RecipeIngredients = ({ ingredients, control, remove, errors }) => {
    return ingredients.map((x, index) => (
        <div key={x.id}>
            <Controller
                control={control}
                name={`ingredients[${index}].name`}
                rules={recipeIngredientRules}
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputGroup className={errors.ingredients?.[index]?.name ? "" : "mb-3"}>
                        <Form.Control
                            name={`ingredient[${index}]`}
                            placeholder="Ingredient"
                            aria-label="Ingredient"
                            aria-describedby="basic-addon2"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value || ''}
                            size="lg"
                            className={errors.ingredients?.[index]?.name ? "border border-3 border-danger" : ""}
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
            {
                errors.ingredients?.[index]?.name &&
                <p className="text-start text-danger">{errors.ingredients[index].name.message}</p>
            }
        </div>
    ));
};

export default RecipeIngredients;