import { Router } from 'express';
import { createStation, getStations } from './station.controller';

const router = Router();

router.post('/add', createStation);
router.get('/list', getStations);

export default router;
