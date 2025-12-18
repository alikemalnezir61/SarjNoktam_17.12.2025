import { sendNotification, listNotifications } from './notification.service';

describe('Notification Service', () => {
  it('should send a notification', async () => {
    const notification = await sendNotification({ message: 'Hello World' });
    expect(notification).toHaveProperty('id');
    expect(notification.message).toBe('Hello World');
  });

  it('should list all notifications', async () => {
    await sendNotification({ message: 'Test Message' });
    const notifications = await listNotifications();
    expect(Array.isArray(notifications)).toBe(true);
    expect(notifications.length).toBeGreaterThan(0);
  });
});
