import { Controller } from "react-hook-form";

import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const RecipeSteps = ({ steps, control, remove, errors }) => {
    return steps.map((field, index) => (
        <div key={field.id}>
            <Controller
                control={control}
                name={`steps[${index}].name`}
                rules={{
                    required: { value: true, message: `Step ${index + 1} must not be empty!` },
                    minLength: { value: 5, message: `Step ${index + 1} must be at least 5 characters long!` }
                }}
                render={({ field: { onChange, onBlur } }) => (
                    <InputGroup className={errors.steps?.[index]?.name ? "" : "mb-3"}>
                        <Form.Control
                            name={`step[${index}]`}
                            placeholder={`Step ${index + 1}`}
                            aria-label={`Step ${index + 1}`}
                            aria-describedby="basic-addon2"
                            onChange={onChange}
                            onBlur={onBlur}
                            size="lg"
                            className={errors.steps?.[index]?.name ? "border border-3 border-danger" : ""}
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
                errors.steps?.[index]?.name &&
                <p className="text-start text-danger">{errors.steps[index].name.message}</p>
            }
        </div>
    ));
};

export default RecipeSteps;