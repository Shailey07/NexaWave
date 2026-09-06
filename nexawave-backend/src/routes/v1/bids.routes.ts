import { Router } from 'express';
import { bidController } from '../../controllers/bid.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/', bidController.postRequirement);
router.post('/:requirementId/bids', bidController.submitBid);
router.get('/:requirementId/bids', bidController.getBidsForRequirement);
router.post('/bids/:bidId/accept', bidController.acceptBid);

export default router;
