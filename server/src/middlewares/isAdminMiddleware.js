exports.isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Log in!' });
    }

    console.log(req.user);

    if (!req.user.isAdmin) {
        return res.status(401).json({ message: 'Unauthorized!' });
    }

    next();
};