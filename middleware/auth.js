const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.user = decoded;
        const user = await User.findById(decoded.userId);
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authenticate;
