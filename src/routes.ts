import { Router } from 'express';
import { HomeController } from './controller/HomeController';
import { UserController } from './controller/UserController';
import { UserService } from './service/UserService';
import { MysqlDataSource } from './config/database';

const router = Router();
const userController = new UserController(new UserService(MysqlDataSource));

router.get('/', new HomeController().hello);
router.post('/', (req, res) => userController.recoverPassword(req, res));

export default router;
