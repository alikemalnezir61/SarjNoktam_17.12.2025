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
import { errorHandler } from './errorHandler';
app.use(errorHandler);
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

import express from 'express';
import winston from 'winston';
import paymentRoutes from './payment.routes';

const app = express();
const port = process.env.PORT || 3002;

const logger = winston.createLogger({
  transports: [new winston.transports.Console()]
});

app.use(express.json());
app.use('/payments', paymentRoutes);

app.get('/', (req, res) => {
  logger.info('Payment service root endpoint called');
  res.send('Payment Service is running');
});

app.listen(port, () => {
  logger.info(`Payment Service listening on port ${port}`);
});
