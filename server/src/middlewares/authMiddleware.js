const { validateToken } = require('../managers/userManager');

exports.authenticate = async (req, res, next) => {
    const token = req.get('X-Authorization');

    if (token) {
        try {
            const decodedToken = await validateToken(token);
            req.user = { ...decodedToken, token };
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    }

    next();
};

exports.isAuthenticated = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Log in!' });
    }

    next();
};