import { Router, Request, Response } from 'express';
import { HomeController } from './controller/HomeController';
import { AuthController } from './controller/AuthController';
import { authenticateToken } from './middleware/AuthMiddleware';

const router = Router();

router.post('/login', new AuthController().login);

//Terminar e documentar endpoint posteriormente
router.get('/v1/check', (req: Request, res: Response) => {
  res.send('Cadastro concluido!');
});

export default router;
