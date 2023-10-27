import { Router, Request, Response } from 'express';
import { UserValidator } from './validator/UserValidator';
import { UserController } from './controller/UserController';
import { AuthController } from './controller/AuthController';

const router = Router();

router.get('/', new HomeController().hello);

export default router;
