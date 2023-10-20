import { Router } from 'express';
import { HomeController } from './controller/HomeController';
import { UsersController } from './controller/UsersController';

const router = Router();

router.get('/', new HomeController().hello);
router.post('/login', new UsersController().login);

export default router;
