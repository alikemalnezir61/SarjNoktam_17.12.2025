import { Request, Response } from 'express';
import { sendNotification, listNotifications } from './notification.service';

export const createNotification = async (req: Request, res: Response) => {
  try {
    const notification = await sendNotification(req.body);
    res.status(201).json(notification);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getNotifications = async (_req: Request, res: Response) => {
  try {
    const notifications = await listNotifications();
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
