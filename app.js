const bodyParser = require('body-parser');
const express = require('express');
const { setupRoutes } = require('./api');
const { apiLogger } = require('./middlewares/api-logger');
const _ = require('lodash');
const middlewares = require('./middlewares');
const cors = require('cors');

require('dotenv').config()

const app = express();

app.use(cors());

app.use(bodyParser.json());

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
