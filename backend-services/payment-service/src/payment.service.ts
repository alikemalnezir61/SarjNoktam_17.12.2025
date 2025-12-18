interface Payment {
  id: number;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
}

const payments: Payment[] = [];

export const createPayment = async (data: { amount: number }) => {
  const payment: Payment = {
    id: payments.length + 1,
    amount: data.amount,
    status: 'pending'
  };
  payments.push(payment);
  return payment;
};

export const getPaymentStatus = async (id: string) => {
  const payment = payments.find(p => p.id === Number(id));
  if (!payment) throw new Error('Payment not found');
  return payment.status;
};
