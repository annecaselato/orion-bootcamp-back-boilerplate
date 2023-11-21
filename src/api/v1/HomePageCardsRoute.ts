import { Router } from 'express';
import bodyParser from 'body-parser';
import { HomePageCardController } from '../../controller/HomePageCardController';
import { validateHomePageCard } from '../../middlewares/homePageCardPostValidation';
import { AuthMiddleware } from '../../middlewares/authValidation';

const router = Router();
router.use(bodyParser.json());

router.get('/get-home-page-cards', AuthMiddleware.authValidation, HomePageCardController.findAllHomePageCards);

router.post('/create-home-page-card', AuthMiddleware.authValidation, validateHomePageCard, HomePageCardController.createHomePageCard);

export default router;
