const ERROR_TYPES = {
  NOT_FOUND: {
    code: 404,
    message: 'Ресурс не найден'
  },
  VALIDATION_ERROR: {
    code: 400,
    message: 'Ошибка валидации данных'
  },
  SERVER_ERROR: {
    code: 500,
    message: 'Внутренняя ошибка сервера'
  },
  BAD_REQUEST: {
    code: 400,
    message: 'Неверный запрос'
  }
};

const createError = (type, customMessage = null) => {
  return {
    success: false,
    error: {
      code: type.code,
      message: customMessage || type.message,
      type: Object.keys(ERROR_TYPES).find(key => ERROR_TYPES[key] === type)
    }
  };
};

const sendError = (res, errorType, customMessage = null) => {
  const error = createError(errorType, customMessage);
  res.status(errorType.code).json(error);
};

module.exports = { ERROR_TYPES, createError, sendError };