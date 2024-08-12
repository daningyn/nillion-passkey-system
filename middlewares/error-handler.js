const _ = require('lodash')

const errorHandler = (err, req, res, next) => {
  var response = {
    result: {
      error: err.message
    }
  }
  console.error(response, err.httpStatusCode);
  return res.status(err.httpStatusCode).send(response);
}

module.exports = errorHandler;