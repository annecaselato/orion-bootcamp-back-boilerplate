import { Router } from 'express';
import bodyParser from 'body-parser';
import { SolController } from '../../controller/SolController';

const router = Router();
router.use(bodyParser.json());

router.get('/soles', SolController.getSoles);

export default router;
