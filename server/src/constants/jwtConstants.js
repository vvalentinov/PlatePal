require('dotenv').config();

exports.JWT_KEY = 'Token';

exports.JWT_SECRET = process.env.JWT_SECRET;