import express from 'express';
const router = express.Router();

// Mock: Topluluk ve sosyal özellikler - yolculuk paylaşımı, grup planlama
let trips: { [groupId: string]: { users: string[], route: string } } = {
  'g1': { users: ['Ali', 'Ayşe'], route: 'İstanbul-Ankara' },
};

router.get('/:groupId/trip', (req, res) => {
  const groupId = req.params.groupId;
  res.json(trips[groupId] || { users: [], route: '' });
});

router.post('/:groupId/trip', (req, res) => {
  const groupId = req.params.groupId;
  const { user, route } = req.body;
  if (!user || !route) return res.status(400).json({ error: 'Eksik veri' });
  if (!trips[groupId]) trips[groupId] = { users: [], route };
  if (!trips[groupId].users.includes(user)) trips[groupId].users.push(user);
  trips[groupId].route = route;
  res.status(201).json(trips[groupId]);
});

router.delete('/:groupId/trip', (req, res) => {
  const groupId = req.params.groupId;
  const { user } = req.body;
  if (!user || !trips[groupId]) return res.status(400).json({ error: 'Eksik veri' });
  trips[groupId].users = trips[groupId].users.filter(u => u !== user);
  res.json(trips[groupId]);
});

export default router;
