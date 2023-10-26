// Username errors
exports.usernameRequiredError = 'Username is required!';
exports.usernameUniqueError = 'Username is already in use!';
exports.usernameMinLengthError = (characters) => `Username must be at least ${characters} characters long!`;
exports.usernameMaxLengthError = (characters) => `Username must not be longer that ${characters} characters!`;

// Password errors
exports.passwordRequiredError = 'Password is required!';
exports.passwordsMismatchError = 'Password and Repeat Password must be the same!';

// Login error
exports.loginError = 'Invalid username or password!';
