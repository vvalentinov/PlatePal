const User = require('../models/User');

const recipeManager = require('../managers/recipeManager');

const { generateToken } = require('../utils/generateTokenUtil');
const { validateUserPassword } = require('../utils/bcryptUtil');

const userErrors = require('../constants/errorMessages/userErrors');

const jwt = require('../lib/jwt');
const { JWT_SECRET } = require('../constants/jwtConstants');

const revokedTokens = new Set();

const createSession = (user, token) => ({
    userId: user._id,
    username: user.username,
    isAdmin: user.isAdmin,
    token,
});

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

exports.getById = (userId) => User.findById(userId);

exports.addRecipeToFavourites = async (userId, recipeId) => {
    const recipe = await recipeManager.getById(recipeId);

    const user = await User.findById(userId);
    if (!user) {
        throw new Error('No user with given id found!');
    }

    let message = 'Added to favourites successfully!';
    let result = true;

    let userFavouriteRecipes = user.favouriteRecipes;

    if (user.favouriteRecipes.includes(recipe._id)) {
        userFavouriteRecipes = user.favouriteRecipes.filter(x => x._id.equals(recipe._id) === false);
        message = 'Recipe removed from favourites successfully!';
        result = false;
    } else {
        userFavouriteRecipes.push(recipe._id);
    }

    await User.findByIdAndUpdate(userId, { favouriteRecipes: userFavouriteRecipes });

    return { message, result };
};

exports.getUserFavouriteRecipes = async (userId) => {
    const user = await User
        .findById(userId)
        .populate('favouriteRecipes', 'name image')
        .exec();

    if (!user) {
        throw new Error('No user with given id found!');
    }

    return user.favouriteRecipes;
};