const jwt = require('../lib/jwt');

const { JWT_KEY, JWT_SECRET } = require('../constants/jwtConstants');

exports.authenticate = async (req, res, next) => {
    const token = req.headers[JWT_KEY];

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, JWT_SECRET);

            req.user = decodedToken;

            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token!' });
        }
    } else {
        next();
    }
};

exports.isAuthenticated = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Log in!' });
    }

    next();
}