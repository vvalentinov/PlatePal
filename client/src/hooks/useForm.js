import { useState } from 'react';

const useForm = (
    initialFormValues,
    onSubmitHandler) => {
    const [formValues, setFormValues] = useState(initialFormValues);

    const onChangeHandler = (e) => setFormValues(state => ({
        ...state,
        [e.target.name]: e.target.value,
    }));

    const onSubmit = (e) => {
        e.preventDefault();
        onSubmitHandler(formValues);
    };

    return {
        formValues,
        onChangeHandler,
        onSubmit,
    };
};

export default useForm;