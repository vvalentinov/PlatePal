const bcrypt = require('bcrypt');

exports.generateHash = async (input, salt) => {
    const hash = await bcrypt.hash(input, salt);

    return hash;
};

exports.validateUserPassword = async (inputPassword, userPassword) => {
    const isValid = await bcrypt.compare(inputPassword, userPassword);

    return isValid;
};