import { Router } from 'express';
import { HomeController } from './controller/HomeController';
import { UserController } from './controller/UserController';
import { UserService } from './service/UserService';
import { MysqlDataSource } from './config/database';
import { body } from 'express-validator';
import httpCodes from './utils/httpCodes';

const router = Router();
const userController = new UserController(
  new UserService(MysqlDataSource),
  new httpCodes()
);

router.get('/', new HomeController().hello);
router.post(
  '/recover-password',
  body('email')
    .trim()
    .notEmpty()
    .withMessage('O campo email é obrigatório')
    .isEmail()
    .withMessage('Formato inválido'),
  (req, res) => userController.recoverPassword(req, res)
);

export default router;
