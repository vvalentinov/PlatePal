import { useState } from 'react';

const useForm = (initialFormValues, onSubmitHandler) => {
    const [formValues, setFormValues] = useState(initialFormValues);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormValues((state) => ({ ...state, [name]: value }));
    };

    const onRecipeStarHandler = (name, value) => setFormValues((state) => ({ ...state, [name]: Number(value) }));

    const onSubmit = (e) => {
        e.preventDefault();
        onSubmitHandler(formValues);
    };

    return {
        formValues,
        onChangeHandler,
        onRecipeStarHandler,
        onSubmit,
    };
};

export default useForm;