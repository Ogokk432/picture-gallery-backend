const validateQueryParams = (req, res, next) => {
  const { page, limit, minYear, maxYear, minPrice, maxPrice } = req.query;

  const numParams = { page, limit, minYear, maxYear, minPrice, maxPrice };
  for (const [key, value] of Object.entries(numParams)) {
    if (value && isNaN(parseInt(value))) {
      return res.status(400).json({
        success: false,
        message: `Параметр '${key}' должен быть числом`
      });
    }
  }

  if (minYear && maxYear && parseInt(minYear) > parseInt(maxYear)) {
    return res.status(400).json({
      success: false,
      message: `'minYear' не может быть больше 'maxYear'`
    });
  }
  if (minPrice && maxPrice && parseInt(minPrice) > parseInt(maxPrice)) {
    return res.status(400).json({
      success: false,
      message: `'minPrice' не может быть больше 'maxPrice'`
    });
  }

  next();
};

module.exports = validateQueryParams;