import { useState } from 'react';

const useForm = (initialFormValues, onSubmitHandler) => {
    const [formValues, setFormValues] = useState(initialFormValues);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormValues((state) => ({ ...state, [name]: value }));
    };

    const onFileChangeHandler = (e) => {
        const { name, files } = e.target;
        setFormValues((state) => ({ ...state, [name]: files[0] }));
    };

    const onRecipeStarHandler = (name, value) => setFormValues((state) => ({ ...state, [name]: Number(value) }));

    const updateSearchQuery = (searchValue) => setFormValues((state) => ({ ...state, search: searchValue }));

    const onSubmit = (e) => {
        e.preventDefault();
        onSubmitHandler(formValues);
    };

    return {
        formValues,
        updateSearchQuery,
        onChangeHandler,
        onFileChangeHandler,
        onRecipeStarHandler,
        onSubmit,
    };
};

export default useForm;