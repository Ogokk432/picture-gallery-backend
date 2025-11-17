const express = require('express');
const router = express.Router();
const {
  getPaintings,
  getPaintingById,
  getFeaturedPaintings,
  getPaintingsByGenre
} = require('../controllers/paintingController');
const validateQueryParams = require('../middleware/validateQueryParams');

router.get('/', validateQueryParams, getPaintings);
router.get('/featured', getFeaturedPaintings);
router.get('/genre/:genre', getPaintingsByGenre);
router.get('/:id', getPaintingById);

module.exports = router;