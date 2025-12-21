import express from 'express';
const router = express.Router();

// Mock: Kullanıcı rozet, seviye ve ödül sistemi
let gamification: { [userId: string]: { badges: string[], level: number, points: number } } = {
  '1': { badges: ['İlk Şarj', 'Yol Arkadaşı'], level: 2, points: 150 },
};

router.get('/:userId/gamification', (req, res) => {
  const userId = req.params.userId;
  res.json(gamification[userId] || { badges: [], level: 1, points: 0 });
});

router.post('/:userId/gamification', (req, res) => {
  const userId = req.params.userId;
  const { badge, points } = req.body;
  if (!gamification[userId]) gamification[userId] = { badges: [], level: 1, points: 0 };
  if (badge && !gamification[userId].badges.includes(badge)) gamification[userId].badges.push(badge);
  if (points) gamification[userId].points += points;
  // Seviye güncelleme
  gamification[userId].level = Math.floor(gamification[userId].points / 100) + 1;
  res.json(gamification[userId]);
});

export default router;
