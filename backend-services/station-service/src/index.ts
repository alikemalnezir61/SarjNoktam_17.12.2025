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
import stationRoutes from './station.routes';

const app = express();
const port = process.env.PORT || 3003;

const logger = winston.createLogger({
  transports: [new winston.transports.Console()]
});

app.use(express.json());
app.use('/stations', stationRoutes);

app.get('/', (req, res) => {
  logger.info('Station service root endpoint called');
  res.send('Station Service is running');
});

app.listen(port, () => {
  logger.info(`Station Service listening on port ${port}`);
});
