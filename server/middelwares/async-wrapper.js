const { STATUS } = require('../utils/constants');

const asyncWrapper = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next))
    .then((response) => {
      const { statusCode, data } = response;
      return res.status(statusCode || STATUS.OK).json(data);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = asyncWrapper;
