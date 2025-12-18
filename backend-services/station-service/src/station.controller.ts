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
