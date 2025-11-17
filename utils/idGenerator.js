const paintings = require('../data/paintingsData');

const generateNextId = () => {
  if (paintings.length === 0) return 1;
  const maxId = Math.max(...paintings.map(p => p.id));
  return maxId + 1;
};

const isIdUnique = (id) => {
  return !paintings.some(p => p.id === id);
};

module.exports = { generateNextId, isIdUnique };