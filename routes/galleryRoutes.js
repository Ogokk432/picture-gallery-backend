const express = require('express');
const router = express.Router();
const { getGalleryInfo } = require('../controllers/galleryController');

router.get('/', getGalleryInfo);
module.exports = router;