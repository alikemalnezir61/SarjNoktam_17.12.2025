import express from 'express';
const router = express.Router();

// Mock: Karbon ayak izi ve tasarruf analizi
router.post('/carbon-footprint', (req, res) => {
  const { distance, vehicleType } = req.body;
  if (!distance || !vehicleType) return res.status(400).json({ error: 'Eksik veri' });
  // Basit analiz: elektrikli araç için 0.05 kg/km, benzinli için 0.2 kg/km
  const factor = vehicleType === 'electric' ? 0.05 : 0.2;
  const carbon = distance * factor;
  const saving = vehicleType === 'electric' ? (distance * 0.15) : 0; // TL cinsinden tasarruf
  res.json({ carbon, saving });
});

export default router;
