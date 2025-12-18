import amqp from 'amqplib';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';
const QUEUE = 'user_registered';

export const publishUserRegistered = async (user: { id: number; username: string }) => {
  const conn = await amqp.connect(RABBITMQ_URL);
  const channel = await conn.createChannel();
  await channel.assertQueue(QUEUE, { durable: false });
  channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(user)));
  setTimeout(() => {
    channel.close();
    conn.close();
  }, 500);
};
