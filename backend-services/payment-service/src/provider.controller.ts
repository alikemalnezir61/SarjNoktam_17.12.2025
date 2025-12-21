import express from 'express';
const router = express.Router();

// Mock: Farklı sağlayıcılar için ödeme işlemleri
const providers = ['ZES', 'Eşarj', 'Tesla'];

router.get('/providers', (req, res) => {
  res.json(providers);
});

router.post('/pay', (req, res) => {
  const { userId, stationId, provider, amount } = req.body;
  if (!userId || !stationId || !provider || !amount) return res.status(400).json({ error: 'Eksik veri' });
  // Mock ödeme işlemi
  res.json({ status: 'success', provider, amount });
});

export default router;
