import { Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { AuthRequest } from '../middlewares/auth.middleware';
import { paymentService } from '../services/payment.service';

export const orderController = {
  async updateStatus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { orderId } = req.params;
      const { status, note } = req.body; // ON_THE_WAY | IN_PROGRESS | COMPLETED | CANCELLED

      const order = await prisma.order.update({
        where: { id: orderId },
        data: { status, ...(status === 'COMPLETED' && { completedAt: new Date() }) },
      });

      await prisma.orderStatusLog.create({ data: { orderId, status, note } });

      res.json({ success: true, order });
    } catch (err) { next(err); }
  },

  async getTimeline(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const logs = await prisma.orderStatusLog.findMany({
        where: { orderId: req.params.orderId },
        orderBy: { timestamp: 'asc' },
      });
      res.json({ success: true, timeline: logs });
    } catch (err) { next(err); }
  },

  async checkout(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { orderId } = req.params;
      const { method } = req.body;

      const order = await prisma.order.findUniqueOrThrow({ where: { id: orderId } });
      const transaction = await paymentService.createTransaction(orderId, order.finalAmount, method);

      res.json({ success: true, transaction });
    } catch (err) { next(err); }
  },

  async rateOrder(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { orderId } = req.params;
      const { givenToId, stars, review } = req.body;

      const rating = await prisma.rating.create({
        data: { orderId, givenById: req.user!.id, givenToId, stars, review },
      });

      const agg = await prisma.rating.aggregate({
        where: { givenToId },
        _avg: { stars: true },
        _count: true,
      });

      await prisma.user.update({
        where: { id: givenToId },
        data: { avgRating: agg._avg.stars || 0, totalRatings: agg._count },
      });

      res.json({ success: true, rating });
    } catch (err) { next(err); }
  },
};
