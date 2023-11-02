import { useFieldArray } from "react-hook-form";

const useDynamicFieldArray = (control, name, watch) => {
    const {
        fields,
        append,
        remove,
    } = useFieldArray({ control, name });

    const watchFieldArray = watch(name);

    const controlledFields = fields.map((field, index) => {
        return {
            ...field,
            ...watchFieldArray[index]
        };
    });

    return {
        controlledFields,
        append,
        remove
    };
};

export default useDynamicFieldArray;