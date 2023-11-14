import { Router } from 'express';
import bodyParser from 'body-parser';
import { PlanCardController } from '../../controller/PlanCardController';

const router = Router();
router.use(bodyParser.json());

router.get('/plan-cards', PlanCardController.getPlanCards);

export default router;
