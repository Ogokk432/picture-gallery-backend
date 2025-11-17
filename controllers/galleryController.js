const paintings = [
  { id: 1, title: 'Девочка с персиками', artist: 'Валентин Серов', year: 1887 },
  { id: 2, title: 'Черный квадрат', artist: 'Казимир Малевич', year: 1915 },
  { id: 3, title: 'Бурлаки на Волге', artist: 'Илья Репин', year: 1873 },
  { id: 4, title: 'Мона Лиза', artist: 'Леонардо да Винчи', year: 1503 },
  { id: 5, title: 'Крик', artist: 'Эдвард Мунк', year: 1893 }
];

const getGalleryInfo = (req, res) => {
  res.json({ success: true, totalPaintings: paintings.length });
};

module.exports = { getGalleryInfo };