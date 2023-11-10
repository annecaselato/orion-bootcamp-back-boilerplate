import { Router } from 'express';
import bodyParser from 'body-parser';
import { LogoutController } from '../../controller/LogoutController';
import { authValidation } from '../../middlewares/authValidation';

const router = Router();
router.use(bodyParser.json());

router.patch('/logout', authValidation, LogoutController.logout);

export default router;
