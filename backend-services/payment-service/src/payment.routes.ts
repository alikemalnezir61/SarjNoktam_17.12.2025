import { Router } from 'express';
import { startPayment, paymentStatus } from './payment.controller';

const router = Router();

router.post('/start', startPayment);
router.get('/:id/status', paymentStatus);

export default router;
