const { ERROR_TYPES, sendError } = require('../utils/errors');

const notFoundHandler = (req, res) => {
  sendError(res, ERROR_TYPES.NOT_FOUND, `Маршрут '${req.method} ${req.originalUrl}' не найден`);
};

module.exports = notFoundHandler;