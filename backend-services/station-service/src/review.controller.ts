import express from 'express';
const router = express.Router();

// Mock: İstasyon için puanlama ve yorumlar
let reviews = [
  { stationId: 1, user: 'Ali', rating: 5, comment: 'Çok iyi istasyon!' },
  { stationId: 2, user: 'Ayşe', rating: 3, comment: 'Ortalama, bazen sıra oluyor.' }
];

router.get('/:stationId/reviews', (req, res) => {
  const stationId = Number(req.params.stationId);
  res.json(reviews.filter(r => r.stationId === stationId));
});

router.post('/:stationId/reviews', (req, res) => {
  const stationId = Number(req.params.stationId);
  const { user, rating, comment } = req.body;
  if (!user || !rating) return res.status(400).json({ error: 'Eksik veri' });
  const review = { stationId, user, rating, comment };
  reviews.push(review);
  res.status(201).json(review);
});

export default router;
