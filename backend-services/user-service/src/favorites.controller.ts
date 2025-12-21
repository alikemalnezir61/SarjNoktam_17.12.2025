import express from 'express';
const router = express.Router();

// Mock: Kullanıcı favori istasyonları
let favorites: { [userId: string]: number[] } = {
  '1': [1, 2], // userId: istasyonId[]
};

router.get('/:userId/favorites', (req, res) => {
  const userId = req.params.userId;
  res.json(favorites[userId] || []);
});

router.post('/:userId/favorites', (req, res) => {
  const userId = req.params.userId;
  const { stationId } = req.body;
  if (!stationId) return res.status(400).json({ error: 'Eksik veri' });
  if (!favorites[userId]) favorites[userId] = [];
  if (!favorites[userId].includes(stationId)) favorites[userId].push(stationId);
  res.status(201).json(favorites[userId]);
});

router.delete('/:userId/favorites', (req, res) => {
  const userId = req.params.userId;
  const { stationId } = req.body;
  if (!stationId || !favorites[userId]) return res.status(400).json({ error: 'Eksik veri' });
  favorites[userId] = favorites[userId].filter(id => id !== stationId);
  res.json(favorites[userId]);
});

export default router;
