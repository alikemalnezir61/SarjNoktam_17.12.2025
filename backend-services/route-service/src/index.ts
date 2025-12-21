import { optimizeRoute, Station } from './optimizer';
// Akıllı rota optimizasyonu endpointi
app.post('/optimize', (req, res) => {
  const { start, end, stations, batteryLevel } = req.body;
  if (!start || !end || !stations || batteryLevel === undefined) {
    return res.status(400).json({ error: 'Eksik parametre' });
  }
  const result = optimizeRoute({ start, end, stations, batteryLevel });
  res.json(result);
});
import express from 'express';
import bodyParser from 'body-parser';
import { errorHandler } from './errorHandler';

const app = express();
app.use(bodyParser.json());

// Mock rota endpoint
app.get('/route', (req, res) => {
  const start = req.query.start || 'istanbul';
  const end = req.query.end || 'ankara';
  // Mock polyline and stations
  const response = {
    start,
    end,
    polyline: [
      { lat: 41.0082, lng: 28.9784 }, // İstanbul
      { lat: 39.9334, lng: 32.8597 }, // Ankara
    ],
    stations: [
      { id: 1, name: 'ZES Sirkeci', lat: 41.012, lng: 28.976 },
      { id: 2, name: 'Eşarj Bolu', lat: 40.735, lng: 31.606 },
      { id: 3, name: 'Tesla Ankara', lat: 39.940, lng: 32.860 },
    ]
  };
  res.json(response);
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Route service listening on port ${PORT}`);
});
