const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const notFoundHandler = require('./middleware/notFoundHandler');
const paintingRoutes = require('./routes/paintingRoutes');
const galleryRoutes = require('./routes/galleryRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(logger);
}

app.use('/api/paintings', paintingRoutes);
app.use('/api/gallery', galleryRoutes);

// Health check — по требованиям Практ. 5
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Сервер работает нормально',
    timestamp: new Date().toISOString()
  });
});

// 404 должен идти ДО errorHandler
app.use(notFoundHandler);

// errorHandler — последний middleware!
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(` Сервер галереи запущен на порту ${PORT}`);
  console.log(` Health check: http://localhost:${PORT}/health`);
});