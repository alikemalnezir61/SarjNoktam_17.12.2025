import express from 'express';
const router = express.Router();

// Mock: Kullanıcı verisi silme ve anonimleştirme
let users: { [userId: string]: { name: string, email: string } } = {
  '1': { name: 'Ali', email: 'ali@example.com' },
};

router.delete('/:userId/data', (req, res) => {
  const userId = req.params.userId;
  if (!users[userId]) return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
  delete users[userId];
  res.json({ status: 'deleted' });
});

router.post('/:userId/anonimize', (req, res) => {
  const userId = req.params.userId;
  if (!users[userId]) return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
  users[userId] = { name: 'Anonim', email: '' };
  res.json({ status: 'anonimized' });
});

export default router;
