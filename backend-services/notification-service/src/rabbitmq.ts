import amqp from 'amqplib';
import { sendNotification } from './notification.service';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';
const QUEUE = 'user_registered';

export const listenUserRegistered = async () => {
  const conn = await amqp.connect(RABBITMQ_URL);
  const channel = await conn.createChannel();
  await channel.assertQueue(QUEUE, { durable: false });
  channel.consume(QUEUE, async (msg) => {
    if (msg) {
      const user = JSON.parse(msg.content.toString());
      await sendNotification({ message: `Yeni kullanıcı kaydı: ${user.username}` });
      channel.ack(msg);
    }
  });
};
