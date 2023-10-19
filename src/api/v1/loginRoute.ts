import { Router } from 'express';
// import { body } from 'express-validator';
import bodyParser from 'body-parser';
import { LoginController } from '../../controller/LoginController';

const router = Router();
router.use(bodyParser.json());

router.post('/login', LoginController.login);

export default router;
