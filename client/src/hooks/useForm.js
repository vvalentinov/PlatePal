import { useState } from 'react';

const useForm = (initialValues) => {
    const [formValues, setFormValues] = useState(initialValues);

    const onChangeHandler = (e) => setFormValues(state => ({ ...state, [e.target.name]: e.target.value }));

    return {
        formValues,
        onChangeHandler,
    };
};

export default useForm;