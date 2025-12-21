import express from 'express';
const router = express.Router();

// Mock: Dinamik fiyat takibi ve karşılaştırma
const prices = [
  { id: 1, name: 'ZES Sirkeci', price: 5.2 },
  { id: 2, name: 'Eşarj Bolu', price: 4.8 },
  { id: 3, name: 'Tesla Ankara', price: 6.0 },
];

router.get('/prices', (req, res) => {
  res.json(prices);
});

export default router;
