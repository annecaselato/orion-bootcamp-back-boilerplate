import { Router } from 'express';
import { HomeController } from './controller/HomeController';
import { UsersController } from './controller/UsersController';
import authMiddleware from './middlewares/authMiddleware';

const router = Router();

router.get('/', new HomeController().hello);
router.post('/users', new UsersController().login);
router.get('/users/logged', authMiddleware, new UsersController().loggedUser);

export default router;
