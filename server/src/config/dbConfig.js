const mongoose = require('mongoose');
require('dotenv').config();

exports.dbConfig = () =>
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Database connected successfully.'))
        .catch(err => console.log(`Database error: ${err.message}!`));