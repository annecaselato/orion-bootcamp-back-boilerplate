import { Router } from 'express';
import { HomeController } from './controller/HomeController';
import loginRoutes from './api/v1/loginRoutes';

const router = Router();

router.use('/v1', loginRoutes);

router.get('/', new HomeController().hello);

export default router;
