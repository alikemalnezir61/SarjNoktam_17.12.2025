import express from 'express';
const router = express.Router();

// Mock: İstasyon rezervasyon ve sıra takibi
let reservations: { [stationId: number]: string[] } = {
  1: ['Ali'],
  2: [],
  3: ['Ayşe'],
};

router.get('/:stationId/reservations', (req, res) => {
  const stationId = Number(req.params.stationId);
  res.json(reservations[stationId] || []);
});

router.post('/:stationId/reservations', (req, res) => {
  const stationId = Number(req.params.stationId);
  const { user } = req.body;
  if (!user) return res.status(400).json({ error: 'Eksik veri' });
  if (!reservations[stationId]) reservations[stationId] = [];
  reservations[stationId].push(user);
  res.status(201).json(reservations[stationId]);
});

router.delete('/:stationId/reservations', (req, res) => {
  const stationId = Number(req.params.stationId);
  const { user } = req.body;
  if (!user || !reservations[stationId]) return res.status(400).json({ error: 'Eksik veri' });
  reservations[stationId] = reservations[stationId].filter(u => u !== user);
  res.json(reservations[stationId]);
});

export default router;
