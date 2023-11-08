import { Router } from 'express';
import { HomeController } from './controllers/HomeController';
import { UsersController } from './controllers/UsersController';
import { UsersValidator } from './validators/UserValidator';
import authMiddleware from './middlewares/authMiddleware';
import { PasswordValidator } from './validators/PasswordValidator';

const router = Router();

router.get('/', new HomeController().hello);
router.post(
  '/users/login',
  new UsersValidator().loginValidate(),
  new UsersController().login
);
router.get('/users/logged', authMiddleware, new UsersController().loggedUser);
router.patch(
  '/users/password-change',
  new PasswordValidator().passwordValidate(),
  new UsersController().updatePassword
);

export default router;
