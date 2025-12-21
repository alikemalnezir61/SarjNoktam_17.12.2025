import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error('Global Error:', err);
  res.status(500).json({ error: 'Bir hata oluştu', details: err.message });
}
