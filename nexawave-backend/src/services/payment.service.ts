import { prisma } from '../config/database';
import { env } from '../config/env';

export const paymentService = {
  calculatePlatformFee(amount: number) {
    const platformFee = (amount * env.PLATFORM_FEE_PERCENT) / 100;
    const providerPayout = amount - platformFee;
    return { platformFee, providerPayout };
  },

  async createTransaction(orderId: string, amount: number, method: 'UPI' | 'CASH') {
    const { platformFee, providerPayout } = this.calculatePlatformFee(amount);
    return prisma.transaction.create({
      data: { orderId, amount, platformFee, providerPayout, method, status: 'PENDING' },
    });
  },

  async markPaid(transactionId: string, gatewayRefId?: string) {
    return prisma.transaction.update({
      where: { id: transactionId },
      data: { status: 'PAID', gatewayRefId },
    });
  },
};
