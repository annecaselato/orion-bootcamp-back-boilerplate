import { Router } from 'express';
import { UserValidator } from './validator/UserValidator';
import { UserController } from './controller/UserController';

const router = Router();

router.get('/', new UserController().hello);

router.post(
  '/signup',
  new UserValidator().validateUserData,
  new UserController().createUser
);

export default router;
