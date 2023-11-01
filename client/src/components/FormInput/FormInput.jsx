import { Controller } from "react-hook-form";

import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const FormInput = ({
    label,
    name,
    control,
    type,
    placeholder,
    className,
    controlId,
    errors,
}) => {
    if (type === 'file') {
        return (
            <Form.Group controlId={controlId} className={className}>
                <Controller
                    control={control}
                    name={name}
                    rules={{
                        required: { value: true, message: 'Image file is required!' },
                        validate: (value) => {
                            if (value.type !== 'image/png' && value.type !== 'image/jpeg') {
                                return "Incorrect extension! Allowed extensions: .png, .jpeg!"
                            }
                            return true;
                        }
                    }}
                    render={({ field: { onChange, onBlur } }) => (
                        <Form.Control
                            accept=".jpg, .jpeg, .png"
                            type="file"
                            size='lg'
                            onChange={(event) => { onChange(event.target.files[0]); }}
                            onBlur={onBlur}
                        />
                    )}
                />
                {errors.recipeFile && (<p className="text-start text-danger">{errors.recipeFile.message}</p>)}
            </Form.Group>
        );
    } else if (type === 'textarea') {
        return (
            <FloatingLabel
                controlId={controlId}
                label={label}
                className={className}
            >
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, onBlur } }) =>
                        <Form.Control
                            as="textarea"
                            onChange={onChange}
                            onBlur={onBlur}
                            placeholder={placeholder}
                            style={{ height: '180px' }}
                        />
                    }
                />
            </FloatingLabel>
        );
    } else {
        return (
            <FloatingLabel
                controlId={controlId}
                label={label}
                className={className}
            >
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, onBlur } }) =>
                        <Form.Control
                            autoComplete="on"
                            type={type}
                            onChange={onChange}
                            onBlur={onBlur}
                            placeholder={placeholder}
                        />
                    }
                />
            </FloatingLabel>
        );
    }
};

export default FormInput;