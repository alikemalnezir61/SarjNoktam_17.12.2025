import winston from 'winston';

const auditLogger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'audit.log' })
  ]
});

export const logUserAction = (userId: number, action: string, details?: any) => {
  auditLogger.info(JSON.stringify({ userId, action, details, timestamp: new Date().toISOString() }));
};
