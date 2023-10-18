import { Router } from 'express';
import { HomeController } from './controller/HomeController';
import loginRoute from './api/v1/loginRoute';

const router = Router();

router.use('/v1', loginRoute);

router.get('/', new HomeController().hello);

export default router;
