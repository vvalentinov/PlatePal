import * as errors from '../constants/errorMessages';

export const usernameValidator = (username) => {
    if (!username) {
        return errors.usernameRequiredError;
    }

    if (username.length < 2 || username.length > 25) {
        return errors.usernameLengthError;
    }

    const regex = /^(?=(?:.*[a-zA-Z]){2})[a-zA-Z0-9]*$/;
    if (!regex.test(username)) {
        return 'Username must have at least two letters and be made of only letters and numbers!';
    }

    return '';
};

export const passwordValidator = (password, repeatPassword) => {
    if (!password) {
        return errors.passwordRequiredError;
    }

    if (repeatPassword !== undefined && password !== repeatPassword) {
        return errors.passwordsMismatchError;
    }

    return '';
};

export const repeatPassValidator = (password, repeatPassword) => {
    if (!repeatPassword) {
        return errors.repeatPasswordRequiredError;
    }

    if (password !== repeatPassword) {
        return errors.passwordsMismatchError;
    }

    return '';
};

export const categoryNameValidator = (name) => {
    if (!name) {
        return errors.categoryNameRequiredError;
    }

    return '';
};

export const categoryDescriptionValidator = (description) => {
    if (!description) {
        return errors.categoryDescriptionRequiredError;
    }

    if (description.length < 200 || description.length > 750) {
        return errors.categoryDescriptionLengthError;
    }

    return '';
};

export const categoryFileValidator = (file) => {
    if (!file) {
        return errors.categoryFileRequiredError;
    }

    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
        return errors.categoryImageFileError;
    }

    return '';
};

export const categoryEditFileValidator = (file) => {
    if (file && file.type !== 'image/png' && file.type !== 'image/jpeg') {
        return errors.categoryImageFileError;
    }

    return '';
};

export const recipeNameValidator = (name) => {
    // if (!name) {
    //     return 'Recipe name is required!';
    // }

    if (name && name.length < 2 || name.length > 100) {
        return 'Recipe name must be between 2 and 100 characters long!';
    }

    const regex = new RegExp(/^[a-zA-Z0-9\s-]*$/);
    if (!regex.test(name)) {
        return 'Recipe name must contain only letters, numbers or spaces!';
    }

    return '';
};

export const commentValidator = (comment) => {
    if (!comment) {
        return 'Comment is required!';
    }

    if (comment.length < 4 || comment.length > 540) {
        return 'Comment must be between 4 and 540 characters long!';
    }

    return '';
};