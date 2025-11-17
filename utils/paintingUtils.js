
const applySearch = (data, query) => {
  if (!query) return data;
  const term = query.toLowerCase();
  return data.filter(item =>
    item.title.toLowerCase().includes(term) ||
    item.artist.toLowerCase().includes(term) ||
    item.description.toLowerCase().includes(term)
  );
};


const applyFilters = (data, { genre, artist, minYear, maxYear, minPrice, maxPrice, featured }) => {
  let result = [...data];

  if (genre) {
    const normalized = genre.toLowerCase();
    result = result.filter(p => p.genre.some(g => g.toLowerCase().includes(normalized)));
  }

  if (artist) {
    const normalized = artist.toLowerCase();
    result = result.filter(p => p.artist.toLowerCase().includes(normalized));
  }

  if (minYear != null) result = result.filter(p => p.year >= parseInt(minYear));
  if (maxYear != null) result = result.filter(p => p.year <= parseInt(maxYear));
  if (minPrice != null) result = result.filter(p => p.price >= parseInt(minPrice));
  if (maxPrice != null) result = result.filter(p => p.price <= parseInt(maxPrice));
  if (featured === 'true') result = result.filter(p => p.isFeatured);

  return result;
};


const applySorting = (data, sortBy = 'title', sortOrder = 'asc') => {
  const order = sortOrder === 'desc' ? -1 : 1;
  return [...data].sort((a, b) => {
    const valA = a[sortBy];
    const valB = b[sortBy];
    if (valA < valB) return -1 * order;
    if (valA > valB) return 1 * order;
    return 0;
  });
};


const applyPagination = (data, page = 1, limit = 10) => {
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;

  return {
    data: data.slice(startIndex, endIndex),
    pagination: {
      currentPage: pageNum,
      totalPages: Math.ceil(data.length / limitNum),
      totalItems: data.length,
      itemsPerPage: limitNum,
      hasNext: endIndex < data.length,
      hasPrev: pageNum > 1
    }
  };
};

module.exports = {
  applySearch,
  applyFilters,
  applySorting,
  applyPagination
};