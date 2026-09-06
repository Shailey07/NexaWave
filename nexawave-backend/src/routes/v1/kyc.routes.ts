import { Router } from 'express';
import { kycController } from '../../controllers/kyc.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { upload } from '../../utils/fileUpload';

const router = Router();

router.use(authMiddleware);

router.post(
  '/submit',
  upload.fields([
    { name: 'aadhaar', maxCount: 1 },
    { name: 'pan', maxCount: 1 },
  ]),
  kycController.submitKyc
);

export default router;
