export const fileRules = {
    required: { value: true, message: 'Image file is required!' },
    validate: (value) => {
        if (value.type !== 'image/png' && value.type !== 'image/jpeg') {
            return "Incorrect extension! Allowed extensions: .png, .jpeg!"
        }
        return true;
    }
};