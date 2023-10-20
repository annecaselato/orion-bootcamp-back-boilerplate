import { Router } from 'express';
import bodyParser from 'body-parser';
import { LoginController } from '../../controller/LoginController';

const router = Router();
router.use(bodyParser.json());

router.post('/login', LoginController.login);

export default router;
