import { Router } from 'express';
import { validationField, Validator } from './validator/UserValidator';
import { UserController } from './controller/UserController';

const router = Router();

router.post('/signup', validationField, Validator, new UserController().create);
router.get('/', new UserController().hello);

export default router;
