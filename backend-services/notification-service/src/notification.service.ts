import { broadcastNotification } from './websocket';
interface Notification {
  id: number;
  message: string;
  date: string;
}

const notifications: Notification[] = [];

export const sendNotification = async (data: { message: string }) => {
  const notification: Notification = {
    id: notifications.length + 1,
    message: data.message,
    date: new Date().toISOString()
  };
  notifications.push(notification);
  broadcastNotification(data.message);
  return notification;
};

export const listNotifications = async () => {
  return notifications;
};
