import { Router } from 'express';
import { createNotification, getNotifications } from './notification.controller';

const router = Router();

router.post('/send', createNotification);
router.get('/list', getNotifications);

export default router;
