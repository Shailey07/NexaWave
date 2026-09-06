import { Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { AuthRequest } from '../middlewares/auth.middleware';

export const kycController = {
  
  // 🚀 User: Submit Documents
  async submitKyc(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      // Frontend/Multer se data aayega. 
      const { aadhaarNumber, panNumber, aadhaarImageUrl, panImageUrl } = req.body;
      
      const kyc = await prisma.kYC.create({
        data: {
          userId: req.user!.id,
          // TypeScript error fix: required fields added
          aadhaarImageUrl: aadhaarImageUrl || "placeholder_aadhaar_image.jpg", 
          panImageUrl: panImageUrl || "placeholder_pan_image.jpg",
          status: 'PENDING'
        }
      });
      
      res.status(201).json({ success: true, message: "KYC submitted successfully, awaiting admin approval.", kyc });
    } catch (err) { 
      next(err); 
    }
  },

  // Admin: Saare pending requests dekhega
  async getPendingKycs(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const pendingKycs = await prisma.kYC.findMany({
        where: { status: 'PENDING' },
      });
      res.json({ success: true, data: pendingKycs });
    } catch (err) { next(err); }
  },

  // Admin: KYC Approve karega
  async approveKyc(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const kyc = await prisma.kYC.update({
        where: { id: req.params.kycId },
        data: { status: 'APPROVED' }
      });
      res.json({ success: true, message: "KYC Approved successfully", kyc });
    } catch (err) { next(err); }
  },

  // Admin: KYC Reject karega
  async rejectKyc(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const kyc = await prisma.kYC.update({
        where: { id: req.params.kycId },
        data: { status: 'REJECTED' }
      });
      res.json({ success: true, message: "KYC Rejected", kyc });
    } catch (err) { next(err); }
  }
};