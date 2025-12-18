import { createPayment, getPaymentStatus } from './payment.service';

describe('Payment Service', () => {
  it('should create a new payment', async () => {
    const payment = await createPayment({ amount: 100 });
    expect(payment).toHaveProperty('id');
    expect(payment.amount).toBe(100);
    expect(payment.status).toBe('pending');
  });

  it('should get payment status', async () => {
    const payment = await createPayment({ amount: 50 });
    const status = await getPaymentStatus(payment.id.toString());
    expect(status).toBe('pending');
  });

  it('should throw error for unknown payment', async () => {
    await expect(getPaymentStatus('999')).rejects.toThrow('Payment not found');
  });
});
