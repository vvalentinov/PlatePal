const mongoose = require('mongoose');

const { generateHash } = require('../utils/bcryptUtil');

const userErrors = require('../constants/errorMessages/userErrors');

const { UserModelName, RecipeModelName } = require('../constants/dbModelsNames');

const { userPasswordRegex } = require('../constants/regexes/regexes');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, userErrors.usernameRequiredError],
        unique: [true, userErrors.usernameUniqueError],
        minLength: [2, userErrors.usernameMinLengthError(2)],
        maxLength: [25, userErrors.usernameMaxLengthError(25)],
    },
    password: {
        type: String,
        required: [true, userErrors.passwordRequiredError],
        minLength: [4, 'Password must be at least 4 characters long!'],
        maxLength: [20, 'Password must not exceed 20 characters!']
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    favouriteRecipes: [{
        type: mongoose.Types.ObjectId,
        ref: RecipeModelName
    }],
});

userSchema.virtual('repeatPassword').set(function (value) {
    if (value !== this.password) {
        throw new Error(userErrors.passwordsMismatchError);
    }
});

userSchema.pre('save', async function () {
    const hash = await generateHash(this.password, 10);

    this.password = hash;
});

const User = mongoose.model(UserModelName, userSchema);

module.exports = User;