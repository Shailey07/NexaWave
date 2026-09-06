import { Response, NextFunction } from 'express';
// FIXED: Imported Prisma to get the correct types
import { Prisma } from '@prisma/client';
import { prisma } from '../config/database';
import { AuthRequest } from '../middlewares/auth.middleware';
import { AppError } from '../utils/appError';

export const bidController = {
  async postRequirement(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const requirement = await prisma.requirement.create({
        data: { ...req.body, postedById: req.user!.id },
      });
      res.status(201).json({ success: true, requirement });
    } catch (err) { next(err); }
  },

  async submitBid(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { requirementId } = req.params;
      const { quotedAmount, message, estimatedTime } = req.body;

      const bid = await prisma.bid.create({
        data: { requirementId, providerId: req.user!.id, quotedAmount, message, estimatedTime },
      });
      res.status(201).json({ success: true, bid });
    } catch (err) { next(err); }
  },

  async getBidsForRequirement(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const bids = await prisma.bid.findMany({
        where: { requirementId: req.params.requirementId },
        include: { provider: { select: { id: true, name: true, avgRating: true, isVerified: true } } },
        orderBy: { quotedAmount: 'asc' },
      });
      res.json({ success: true, bids });
    } catch (err) { next(err); }
  },

  async acceptBid(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { bidId } = req.params;
      const bid = await prisma.bid.findUnique({ include: { requirement: true }, where: { id: bidId } });
      if (!bid) throw new AppError('Bid not found', 404);

      // FIXED: Added Prisma.TransactionClient type to 'tx'
      const order = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        await tx.bid.update({ where: { id: bidId }, data: { status: 'ACCEPTED' } });
        await tx.bid.updateMany({
          where: { requirementId: bid.requirementId, id: { not: bidId } },
          data: { status: 'REJECTED' },
        });

        const newOrder = await tx.order.create({
          data: {
            requirementId: bid.requirementId,
            acceptedBidId: bid.id,
            customerId: bid.requirement.postedById,
            providerId: bid.providerId,
            finalAmount: bid.quotedAmount,
            status: 'CONFIRMED',
          },
        });

        await tx.orderStatusLog.create({ data: { orderId: newOrder.id, status: 'CONFIRMED' } });
        await tx.requirement.update({ where: { id: bid.requirementId }, data: { isClosed: true } });

        return newOrder;
      });

      res.json({ success: true, order });
    } catch (err) { next(err); }
  },
};