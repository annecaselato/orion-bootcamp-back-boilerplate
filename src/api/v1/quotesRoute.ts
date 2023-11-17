import { Router } from 'express';
import bodyParser from 'body-parser';
import { QuoteController } from './../../controller/QuoteController';
import { AuthMiddleware } from '../../middlewares/authValidation';

const router = Router();
router.use(bodyParser.json());

router.get('/quotes', AuthMiddleware.authValidation, QuoteController.getAllQuotes);
router.get('/quotes/random', AuthMiddleware.authValidation, QuoteController.getRandomQuotes);
router.get('/quotes/paginated', AuthMiddleware.authValidation, QuoteController.getPaginatedQuotes);
router.get('/quotes/:id', AuthMiddleware.authValidation, QuoteController.getQuoteById);

export default router;
