import { Request, Response, NextFunction } from 'express';
import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'station-service.log' })
  ]
});

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(err.message);
  res.status(500).json({ error: err.message });
};
