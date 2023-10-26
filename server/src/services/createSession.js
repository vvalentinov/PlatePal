exports.createSession = (user, token) => {
    const result = {
        userId: user._id,
        username: user.username,
        token,
    };

    return result;
};