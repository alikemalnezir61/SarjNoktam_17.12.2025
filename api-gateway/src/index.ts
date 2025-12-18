import { quotaManager } from './quotaManager';
app.use(quotaManager);
import { aiRateLimiter } from './aiRateLimiter';
app.use(aiRateLimiter);
import Sentry from './sentry';
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
import { setupGraphQL } from './graphql';
if (featureFlags.enableGraphQL) {
  setupGraphQL(app);
}
import './tracing';
import { featureFlags } from './featureFlags';
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/ready', (req, res) => {
  res.status(200).json({ ready: true });
});

app.get('/feature', (req, res) => {
  res.json({ enableGraphQL: featureFlags.enableGraphQL });
});
import { errorHandler } from './errorHandler';
app.use(errorHandler);
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
import express from 'express';
import winston from 'winston';

const app = express();
const port = process.env.PORT || 3000;

const logger = winston.createLogger({
  transports: [new winston.transports.Console()]
});

app.get('/', (req, res) => {
  logger.info('API Gateway root endpoint called');
  res.send('API Gateway is running');
});

app.listen(port, () => {
  logger.info(`API Gateway listening on port ${port}`);
});
