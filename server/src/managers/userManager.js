const User = require('../models/User');

const bcrypt = require('bcrypt');

const recipeManager = require('../managers/recipeManager');
const commentManager = require('../managers/commentManager');
const ratingManager = require('../managers/ratingManager');

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

exports.changeUsername = async (userId, token, newUsername) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('No user with given id found!');
    }

    const updatedUser = await User.findByIdAndUpdate(userId, { username: newUsername }, { new: true });

    this.logout(token);

    const tokenToBeSent = await generateToken(updatedUser._id, updatedUser.username, updatedUser.isAdmin);
    return createSession(updatedUser, tokenToBeSent);
};

exports.changePassword = async (userId, oldPassword, newPassword) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('No user with given id found!');
    }

    const isValid = await bcrypt.compare(oldPassword, user.password);
    if (!isValid) {
        throw new Error('Old password is not correct!');
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ _id: userId }, { password: newPasswordHash });
};

exports.makeAdmin = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('No user with given id found!');
    }

    const updatedUser = await User.findByIdAndUpdate(userId, { isAdmin: true }, { new: true });
    return updatedUser;
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
    const user = await User.findById(userId)
        .populate('favouriteRecipes', 'name image');

    if (!user) {
        throw new Error('No user with given id found!');
    }

    return user.favouriteRecipes;
};

exports.getAllUsers = async (userRole) => {
    if (userRole === 'undefined') {
        const users = await User.find({}).sort({ 'username': 'asc' }).exec();
        return users;
    }

    if (userRole !== 'Admin' && userRole !== 'User') {
        throw new Error('Invalid user role!');
    }

    if (userRole === 'Admin') {
        const users = await User.find({ isAdmin: true }).sort({ 'username': 'asc' }).exec();
        return users;
    }

    const users = await User.find({ isAdmin: false }).sort({ 'username': 'asc' }).exec();
    return users;
};

exports.deleteUser = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('No user with given id found!');
    }

    await recipeManager.deleteAllUserRecipes(userId);
    await commentManager.deleteAllUserComments(userId);
    await ratingManager.deleteUserRatings(userId);

    await User.findByIdAndDelete(userId);

    return user._id;
};

exports.deleteMyProfile = async (userId, currentUserId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('No user with given id found!');
    }

    if (userId !== currentUserId) {
        throw new Error('Unauthorized: You do not have permission to perform this action on the specified user.');
    }

    await recipeManager.deleteAllUserRecipes(userId);
    await commentManager.deleteAllUserComments(userId);
    await ratingManager.deleteUserRatings(userId);

    await User.findByIdAndDelete(userId);

    return user._id;
};