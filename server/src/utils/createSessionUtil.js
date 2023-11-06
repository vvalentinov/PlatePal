exports.createSession = (user, token) => {
    const result = {
        userId: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
        token,
    };

    return result;
};