const morgan = require('morgan');

const apiLogger = (app) => {
  app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms')
  );
};

module.exports = { apiLogger };