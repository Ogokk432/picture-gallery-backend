const { ERROR_TYPES, sendError } = require('../utils/errors');

const errorHandler = (err, req, res, next) => {
  console.error('Глобальная ошибка:', err);

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.statusCode,
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
      }
    });
  }

  sendError(
    res,
    ERROR_TYPES.SERVER_ERROR,
    process.env.NODE_ENV === 'development' ? err.message : 'Внутренняя ошибка сервера'
  );
};

module.exports = errorHandler;