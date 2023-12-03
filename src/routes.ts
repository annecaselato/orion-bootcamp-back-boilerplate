import { Router } from 'express';
import { HomeController } from './controllers/HomeController';
import { UsersController } from './controllers/UsersController';
import { UsersValidator } from './validators/UserValidator';
import authMiddleware from './middlewares/authMiddleware';
import { UsersMetricsController } from './controllers/UsersMetricsController';
import { MetereologyController } from './controllers/MetereologyController';

const router = Router();

router.get('/', new HomeController().hello);

router.post(
  '/users/login',
  new UsersValidator().loginValidate(),
  new UsersController().login
);

router.get('/users/logged', authMiddleware, new UsersController().loggedUser);
router.get('/users/logout', authMiddleware, new UsersController().userLogout);

router.post(
  '/users/recover-password',
  new UsersValidator().recoverPasswordValidate(),
  new UsersController().recoverPassword
);

router.post(
  '/users/new-user',
  new UsersValidator().createNewUser(),
  new UsersController().newUser
);

router.post(
  '/users/token-validation',
  new UsersValidator().tokenValidate(),
  new UsersController().tokenValidation
);

router.patch(
  '/users/password-change',
  new UsersValidator().tokenValidate(),
  new UsersValidator().passwordValidate(),
  new UsersController().updatePassword
);

router.patch(
  '/metrics/registration-started',
  new UsersMetricsController().updateMetricOpen
);

router.patch(
  '/metrics/incomplete-registrations',
  new UsersMetricsController().updateMetricIncomplete
);

router.get(
  '/metereology/soles',
  authMiddleware,
  new MetereologyController().getSolesInWeatherApi
);

export default router;
