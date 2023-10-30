const express = require('express');

const { PORT } = require('./constants/main');

const { dbConfig } = require('./config/dbConfig');
const { expressConfig } = require('./config/expressConfig');
const { cloudinaryConfig } = require('./config/cloudinaryConfig');

const { authenticate } = require('./middlewares/authMiddleware');
const { corsMiddleware } = require('./middlewares/corsMiddleware');

const routes = require('./routes');

const app = express();

dbConfig();
expressConfig(app);
cloudinaryConfig();

app.use(corsMiddleware());
app.use(authenticate);
app.use(routes);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));