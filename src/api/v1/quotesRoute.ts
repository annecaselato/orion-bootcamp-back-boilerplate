import { Router } from 'express';
import bodyParser from 'body-parser';
import { QuoteController } from './../../controller/QuoteController';

const router = Router();
router.use(bodyParser.json());

router.get('/quotes', QuoteController.getAllQuotes);
router.get('/quotes/random', QuoteController.getRandomQuotes);
router.get('/quotes/paginated', QuoteController.getPaginatedQuotes);
router.get('/quotes/:id', QuoteController.getQuoteById);

export default router;
