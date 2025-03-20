const { ERRORS, STATUS } = require('./constants');

const apiPathNotFoundError = (req, res, next) =>
  next(new NotFoundError(ERRORS.REQ_PATH_NOT_FOUND));

class ApiError extends Error {
  constructor(statusCode, message, name) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}

class NotFoundError extends ApiError {
  constructor(message) {
    super(STATUS.NOT_FOUND, message, ERRORS.NOT_FOUND);
  }
}

class BadRequestError extends ApiError {
  constructor(message) {
    super(STATUS.BAD_REQUEST, message, ERRORS.BAD_REQUEST);
  }
}

module.exports = {
  apiPathNotFoundError,
  NotFoundError,
  BadRequestError,
};
