import { Router } from 'express';
import { HomeController } from './controllers/HomeController';
import { UsersController } from './controllers/UsersController';
import { UsersValidator } from './validators/UserValidator';
import authMiddleware from './middlewares/authMiddleware';

const router = Router();

router.get('/', new HomeController().hello);

router.post(
  '/users/login',
  new UsersValidator().loginValidate(),
  new UsersController().login
);

router.get('/users/logged', authMiddleware, new UsersController().loggedUser);
router.post(
  '/users/recover-password',
  new UsersValidator().recoverPasswordValidate(),
  new UsersController().recoverPassword
);

router.patch(
  '/users/password-change',
  new UsersValidator().tokenValidate(),
  new UsersValidator().passwordValidate(),
  new UsersController().updatePassword
);

export default router;
