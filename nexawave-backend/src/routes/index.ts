import { Router } from 'express';
import authRoutes from './v1/auth.routes';
import kycRoutes from './v1/kyc.routes';
import cropRoutes from './v1/crops.routes';
import bidRoutes from './v1/bids.routes';
import orderRoutes from './v1/orders.routes';
import adminRoutes from './v1/admin.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/kyc', kycRoutes);
router.use('/crops', cropRoutes);
router.use('/requirements', bidRoutes);
router.use('/orders', orderRoutes);
router.use('/admin', adminRoutes); // full path becomes /api/v1/admin/dashboard/login

export default router;
