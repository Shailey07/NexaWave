import { Router } from 'express';
import { cropController } from '../../controllers/crop.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { upload } from '../../utils/fileUpload';

const router = Router();

// Public browsing (no auth needed to view listings/prices/weather)
router.get('/market-prices', cropController.getMarketPrices);
router.get('/weather-advisory', cropController.getWeatherAdvisory);
router.get('/', cropController.getCropListings);
router.get('/:id', cropController.getCropListingById);

router.get('/machinery/list', cropController.getMachineryList);

// Protected actions
router.use(authMiddleware);

router.post('/', upload.array('images', 5), cropController.createCropListing);
router.patch('/:id/mark-sold', cropController.markCropSold);
router.delete('/:id', cropController.deleteCropListing);

router.post('/machinery', upload.array('images', 5), cropController.createMachinery);
router.patch('/machinery/:id/toggle-availability', cropController.toggleMachineryAvailability);

export default router;
