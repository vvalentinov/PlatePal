const User = require('../models/User');

const { generateToken } = require('../utils/generateTokenUtil');
const { validateUserPassword } = require('../utils/bcryptUtil');

const userErrors = require('../constants/errorMessages/userErrors');

const { createSession } = require('../services/createSessionService');

const jwt = require('../lib/jwt');
const { JWT_SECRET } = require('../constants/jwtConstants');

const revokedTokens = new Set();

exports.register = async (userData) => {
    const userWithUsername = await User.findOne({ username: userData.username });
    if (userWithUsername) {
        throw new Error(userErrors.usernameUniqueError);
    }

    const createdUser = await User.create({ ...userData, isAdmin: false });

    const token = await generateToken(createdUser._id, createdUser.username, createdUser.isAdmin);

    const result = createSession(createdUser, token);

    return result;
};

exports.login = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error(userErrors.loginError);
    }

    const isPassValid = await validateUserPassword(password, user.password);
    if (!isPassValid) {
        throw new Error(userErrors.loginError);
    }

    const token = await generateToken(user._id, user.username, user.isAdmin);

    const result = createSession(user, token);

    return result;
};


exports.validateToken = async (token) => {
    if (revokedTokens.has(token)) {
        throw new Error('Invalid token!');
    }

    return await jwt.verify(token, JWT_SECRET);
};

exports.logout = (token) => revokedTokens.add(token);