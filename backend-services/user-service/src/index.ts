import './tracing';
import { featureFlags } from './featureFlags';
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/ready', (req, res) => {
  // Burada örneğin veritabanı veya cache bağlantısı kontrol edilebilir
  res.status(200).json({ ready: true });
});

// Feature flag örneği
app.get('/feature', (req, res) => {
  res.json({ enableNewFeature: featureFlags.enableNewFeature });
});
import passport from './googleAuth';
import redisClient from './redisClient';
app.use(passport.initialize());
app.get('/users/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/users/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  // Oturum açan kullanıcıyı Redis'e kaydet
  if (req.user) {
    redisClient.set(`user:${req.user.id}`, JSON.stringify(req.user));
  }
  res.redirect('/');
});
import { errorHandler } from './errorHandler';
app.use(errorHandler);
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

import express from 'express';
import winston from 'winston';
import userRoutes from './user.routes';

const app = express();
const port = process.env.PORT || 3001;

const logger = winston.createLogger({
  transports: [new winston.transports.Console()]
});

app.use(express.json());
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  logger.info('User service root endpoint called');
  res.send('User Service is running');
});

app.listen(port, () => {
  logger.info(`User Service listening on port ${port}`);
});
