import { Router } from 'express';
import { HomeController } from './controller/HomeController';
import { UserController } from './controller/UserController';
import { UserService } from './service/UserService';
import { MysqlDataSource } from './config/database';
import { emailValidation } from './middlewares/emailValidation';

const router = Router();
const userController = new UserController(new UserService(MysqlDataSource));

router.get('/', new HomeController().hello);
router.post('/recover-password', emailValidation, (req, res) =>
  userController.recoverPassword(req, res)
);

export default router;
