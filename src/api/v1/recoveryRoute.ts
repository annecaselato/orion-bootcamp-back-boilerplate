import { Router } from 'express';
import bodyParser from 'body-parser';
import { RecoveryController } from '../../controller/RecoveryController';

const router = Router();
router.use(bodyParser.json());

router.post('/recovery', RecoveryController.recovery);

export default router;
