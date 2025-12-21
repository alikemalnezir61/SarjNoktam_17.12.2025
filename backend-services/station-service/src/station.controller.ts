import express from 'express';
const router = express.Router();

// Gerçek zamanlı doluluk ve arıza bilgisi için mock endpoint
router.get('/status', (req, res) => {
  const stations = [
    { id: 1, name: 'ZES Sirkeci', status: 'AVAILABLE', busy: false, offline: false },
    { id: 2, name: 'Eşarj Bolu', status: 'BUSY', busy: true, offline: false },
    { id: 3, name: 'Tesla Ankara', status: 'OFFLINE', busy: false, offline: true },
  ];
  res.json(stations);
});

export default router;
import { Request, Response } from 'express';
import { addStation, listStations } from './station.service';

export const createStation = async (req: Request, res: Response) => {
  try {
    const station = await addStation(req.body);
    res.status(201).json(station);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getStations = async (_req: Request, res: Response) => {
  try {
    const stations = await listStations();
    res.status(200).json(stations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
