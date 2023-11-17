import { Router } from 'express';
import bodyParser from 'body-parser';
import { SolController } from '../../controller/SolController';
import { AuthMiddleware } from '../../middlewares/authValidation';

const router = Router();
router.use(bodyParser.json());

router.get('/soles', AuthMiddleware.authValidation, SolController.getSoles);

export default router;
