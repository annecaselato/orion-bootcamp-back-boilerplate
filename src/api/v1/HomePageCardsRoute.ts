import { Router } from 'express';
import bodyParser from 'body-parser';
import { HomePageCardController } from '../../controller/HomePageCardController';
import { validateHomePageCard } from '../../middlewares/homePageCardPostValidation';
const router = Router();
router.use(bodyParser.json());

router.get('/get-home-page-cards', HomePageCardController.findAllHomePageCards);

router.post('/create-home-page-card', validateHomePageCard, HomePageCardController.createHomePageCard);

export default router;
