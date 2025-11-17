const paintings = require('../data/paintingsData');
const {
  applySearch,
  applyFilters,
  applySorting,
  applyPagination
} = require('../utils/paintingUtils');

const getPaintings = (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      genre,
      artist,
      minYear,
      maxYear,
      minPrice,
      maxPrice,
      featured,
      sortBy = 'title',
      sortOrder = 'asc'
    } = req.query;

    let result = applySearch(paintings, search?.toLowerCase());
    result = applyFilters(result, { genre, artist, minYear, maxYear, minPrice, maxPrice, featured });
    result = applySorting(result, sortBy, sortOrder);
    const { data, pagination } = applyPagination(result, page, limit);

    const availableFilters = {
      genres: [...new Set(paintings.flatMap(p => p.genre))],
      artists: [...new Set(paintings.map(p => p.artist))],
      years: {
        min: Math.min(...paintings.map(p => p.year)),
        max: Math.max(...paintings.map(p => p.year))
      },
      prices: {
        min: Math.min(...paintings.map(p => p.price).filter(p => p > 0)),
        max: Math.max(...paintings.map(p => p.price))
      }
    };

    res.json({
      success: true,
      pagination,
      filters: {
        applied: Object.keys(req.query).length > 0 ? req.query : null,
        available: availableFilters
      },
      data
    });
  } catch (error) {
    console.error('Ошибка в getPaintings:', error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const getPaintingById = (req, res) => {
  try {
    const paintingId = parseInt(req.params.id);
    if (isNaN(paintingId)) {
      return sendError(res, ERROR_TYPES.VALIDATION_ERROR, `ID должен быть числом`);
    }
    const painting = paintings.find(p => p.id === paintingId);
    if (!painting) {
      return sendError(res, ERROR_TYPES.NOT_FOUND, `Картина с ID ${paintingId} не найдена`);
    }
    res.json({ success: true, data: painting });
  } catch (error) {
    console.error('Ошибка в getPaintingById:', error);
    sendError(res, ERROR_TYPES.SERVER_ERROR, 'Не удалось получить данные картины');
  }
};

const getFeaturedPaintings = (req, res) => {
  try {
    const featured = paintings.filter(p => p.isFeatured);
    if (featured.length === 0) {
      return sendError(res, ERROR_TYPES.NOT_FOUND, 'Нет featured картин в галерее');
    }
    res.json({ success: true, count: featured.length, data: featured });
  } catch (error) {
    console.error('Ошибка в getFeaturedPaintings:', error);
    sendError(res, ERROR_TYPES.SERVER_ERROR, 'Не удалось получить featured картины');
  }
};

const getPaintingsByGenre = (req, res) => {
  try {
    const genre = req.params.genre;
    const filtered = paintings.filter(p =>
      p.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    );
    if (filtered.length === 0) {
      return sendError(res, ERROR_TYPES.NOT_FOUND, `Картины в жанре '${genre}' не найдены`);
    }
    res.json({ success: true, count: filtered.length, genre, data: filtered });
  } catch (error) {
    console.error('Ошибка в getPaintingsByGenre:', error);
    sendError(res, ERROR_TYPES.SERVER_ERROR, 'Не удалось отфильтровать картины по жанру');
  }
};

module.exports = {
  getPaintings,
  getPaintingById,
  getFeaturedPaintings,
  getPaintingsByGenre
};