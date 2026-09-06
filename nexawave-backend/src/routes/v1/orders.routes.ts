import { Router } from 'express';
import { orderController } from '../../controllers/order.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.patch('/:orderId/status', orderController.updateStatus);
router.get('/:orderId/timeline', orderController.getTimeline);
router.post('/:orderId/checkout', orderController.checkout);
router.post('/:orderId/rate', orderController.rateOrder);

export default router;
