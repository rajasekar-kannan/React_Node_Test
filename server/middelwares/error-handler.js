const { STATUS } = require('../utils/constants');

class ErrorHandler {
  static handle() {
    return async (err, req, res, next) => {
      const statusCode = err.statusCode || STATUS.INTERNAL_SERVER_ERROR;
      console.log('error occurred: ', err, statusCode);
      console.log(err);

      const errorResponse = {
        success: false,
        type: err.name,
        statusCode,
        message: err.message || err.sentryErrorMsg,
        stack: err.stack
      };

      res.status(statusCode).send(errorResponse);
    };
  }

  static initializeUnhandledException() {
    process.on('unhandledRejection', (err) => {
      console.log(err.name, err.message);
      console.log('Unhandled Rejection ...');
      throw err;
    });

    process.on('uncaughtException', (err) => {
      console.log(err.name, err.message);
      console.log('Uncaught Exception ...');
    });
  }
}

module.exports = ErrorHandler;
