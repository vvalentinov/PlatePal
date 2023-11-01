import { Controller } from "react-hook-form";

import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const RecipeDynamicField = ({
    control,
    name,
    index,
    remove,
    placeholder
}) => {
    return (<Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur } }) => (
            <InputGroup className="mb-3">
                <Form.Control
                    name={name}
                    placeholder={placeholder}
                    aria-label={placeholder}
                    aria-describedby="basic-addon2"
                    onChange={onChange}
                    onBlur={onBlur}
                />
                <Button onClick={() => remove(index)} variant="outline-danger">
                    Delete
                </Button>
            </InputGroup>
        )}
    />);
};

export default RecipeDynamicField;