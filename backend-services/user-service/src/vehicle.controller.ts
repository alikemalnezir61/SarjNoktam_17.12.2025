import express from 'express';
const router = express.Router();

// Mock: Araç API entegrasyonu
let vehicles: { [userId: string]: { battery: number, range: number } } = {
  '1': { battery: 80, range: 250 },
};

router.get('/:userId/vehicle', (req, res) => {
  const userId = req.params.userId;
  res.json(vehicles[userId] || { battery: 0, range: 0 });
});

router.post('/:userId/vehicle', (req, res) => {
  const userId = req.params.userId;
  const { battery, range } = req.body;
  if (battery === undefined || range === undefined) return res.status(400).json({ error: 'Eksik veri' });
  vehicles[userId] = { battery, range };
  res.status(201).json(vehicles[userId]);
});

export default router;
