import { Router, Request, Response } from 'express';
import { HomeController } from './controller/HomeController';

const router = Router();

router.get('/', new HomeController().hello);

//Terminar e documentar endpoint posteriormente
router.get('/v1/check', (req: Request, res: Response) => {
  res.send('Cadastro concluido!');
});

export default router;
