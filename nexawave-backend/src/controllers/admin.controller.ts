import { Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { AuthRequest } from '../middlewares/auth.middleware';

export const adminController = {
  async getPendingKycs(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const kycs = await prisma.kYC.findMany({ where: { status: 'PENDING' }, include: { user: true } });
      res.json({ success: true, kycs });
    } catch (err) { next(err); }
  },

  async suspendUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const { reason } = req.body;
      await prisma.user.update({ where: { id: userId }, data: { isSuspended: true, suspendReason: reason } });
      res.json({ success: true, message: 'User suspended' });
    } catch (err) { next(err); }
  },

  async getDisputes(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const disputes = await prisma.dispute.findMany({
        where: { status: { in: ['OPEN', 'IN_REVIEW'] } },
        include: { order: true, raisedBy: { select: { name: true, phone: true } } },
      });
      res.json({ success: true, disputes });
    } catch (err) { next(err); }
  },

  async resolveDispute(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { disputeId } = req.params;
      const { resolutionNote, status } = req.body;
      const dispute = await prisma.dispute.update({
        where: { id: disputeId },
        data: { resolutionNote, status },
      });
      res.json({ success: true, dispute });
    } catch (err) { next(err); }
  },
};
