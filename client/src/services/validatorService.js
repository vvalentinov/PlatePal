import * as errorMessages from '../constants/errorMessages';

export const usernameValidator = (username) => {
    if (!username) {
        return errorMessages.usernameEmptyError;
    } else if (username.length < 3 || username.length > 30) {
        return errorMessages.usernameLengthError;
    }
};

export const passwordValidator = (password, repeatPassword) => {
    if (!password) {
        return errorMessages.passwordEmptyError;
    } else if (password !== repeatPassword) {
        return errorMessages.passwordsMismatchError;
    } else {
        return '';
    }
};

export const repeatPasswordValidator = (password, repeatPassword) => {
    if (!repeatPassword) {
        return errorMessages.repeatPasswordEmptyError;
    } else if (password !== repeatPassword) {
        return errorMessages.passwordsMismatchError;
    } else {
        return '';
    }
};