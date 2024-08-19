const bodyParser = require('body-parser');
const express = require('express');
const { setupRoutes } = require('./api');
const { apiLogger } = require('./middlewares/api-logger');
const _ = require('lodash');
const middlewares = require('./middlewares');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config()

const app = express();

app.use(cookieParser());

app.use(bodyParser.json());

app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// middlewares
apiLogger(app);
_.each(Object.keys(middlewares), key => {
    app.use(middlewares[key]);
});

const router = express.Router();
setupRoutes(router);

app.use('/api', router);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
