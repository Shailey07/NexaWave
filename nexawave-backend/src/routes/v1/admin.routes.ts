import { Router } from 'express';
import { authController } from '../../controllers/auth.controller';
import { adminController } from '../../controllers/admin.controller';
import { kycController } from '../../controllers/kyc.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { requireAdmin, verifyAdminAccessKey } from '../../middlewares/admin.middleware';

const router = Router();

// Strictly only accessible at this exact path with access key header
router.post('/dashboard/login', verifyAdminAccessKey, authController.adminLogin);

router.use(authMiddleware, requireAdmin);
router.get('/kyc/pending', kycController.getPendingKycs);
router.post('/kyc/:kycId/approve', kycController.approveKyc);
router.post('/kyc/:kycId/reject', kycController.rejectKyc);
router.post('/users/:userId/suspend', adminController.suspendUser);
router.get('/disputes', adminController.getDisputes);
router.post('/disputes/:disputeId/resolve', adminController.resolveDispute);

export default router;
