import * as errors from '../constants/errorMessages';

export const usernameValidator = (username) => {
    if (!username) {
        return errors.usernameRequiredError;
    }

    if (username.length < 3 || username.length > 30) {
        return errors.usernameLengthError;
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