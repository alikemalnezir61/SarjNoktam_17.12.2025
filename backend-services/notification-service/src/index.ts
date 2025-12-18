import './tracing';
import { featureFlags } from './featureFlags';
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/ready', (req, res) => {
  res.status(200).json({ ready: true });
});

app.get('/feature', (req, res) => {
  res.json({ enableNewFeature: featureFlags.enableNewFeature });
});
import http from 'http';
import { initWebSocket, broadcastNotification } from './websocket';
import { errorHandler } from './errorHandler';
app.use(errorHandler);
import { listenUserRegistered } from './rabbitmq';
listenUserRegistered();
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

import express from 'express';
import winston from 'winston';
import notificationRoutes from './notification.routes';

const app = express();
const port = process.env.PORT || 3004;

const logger = winston.createLogger({
  transports: [new winston.transports.Console()]
});

app.use(express.json());
app.use('/notifications', notificationRoutes);

app.get('/', (req, res) => {
  logger.info('Notification service root endpoint called');
  res.send('Notification Service is running');
});

const server = http.createServer(app);
initWebSocket(server);

server.listen(port, () => {
  logger.info(`Notification Service listening on port ${port}`);
});
