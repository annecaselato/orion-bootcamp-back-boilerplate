import { Router } from 'express';
import { HomeController } from './controller/HomeController';
import { UsersController } from './controller/UsersController';
import authMiddleware from './middlewares/authMiddleware';

const router = Router();

router.get('/', new HomeController().hello);
router.post('/login', new UsersController().login);
router.get('/loading', authMiddleware, new HomeController().index);

export default router;
