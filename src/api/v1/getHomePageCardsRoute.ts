import { Router } from 'express';
import bodyParser from 'body-parser';
import { HomePageCardController } from '../../controller/HomePageCardController';
import { HomePageCardRepository } from '../../repositories/homePageCardRepository';

const router = Router();
router.use(bodyParser.json());

const homePageCardRepository = new HomePageCardRepository();
const homePageCardController = new HomePageCardController(homePageCardRepository);

router.get('/get-home-page-cards', (req, res) => homePageCardController.findAllHomePageCards(req, res));

export default router;
