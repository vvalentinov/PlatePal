const mongoose = require('mongoose');

const { DB_NAME } = require('../constants/main');

exports.dbConfig = () =>
    mongoose.connect(`mongodb://127.0.0.1:27017/${DB_NAME}`)
        .then(() => console.log('Database connected successfully.'))
        .catch(err => console.log(`Database error: ${err.message}!`));