import { Request, Response } from 'express';
import { createPayment, getPaymentStatus } from './payment.service';

export const startPayment = async (req: Request, res: Response) => {
  try {
    const payment = await createPayment(req.body);
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const paymentStatus = async (req: Request, res: Response) => {
  try {
    const status = await getPaymentStatus(req.params.id);
    res.status(200).json({ status });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
