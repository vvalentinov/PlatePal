import { Controller } from "react-hook-form";

import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const RecipeSteps = ({ steps, control, remove }) => {
    return steps.map((field, index) => (
        <Controller
            key={field.id}
            control={control}
            name={`steps[${index}]`}
            render={({ field: { onChange, onBlur } }) => (
                <InputGroup className="mb-3">
                    <Form.Control
                        name={`steps[${index}]`}
                        placeholder="Step"
                        aria-label="Step"
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

export default RecipeSteps;