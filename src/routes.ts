import { Router, Request, Response } from 'express';
import { HomeController } from './controller/HomeController';
import { AuthController } from './controller/AuthController';

const router = Router();

router.get('/', function (req, res) {
  res.send('esta é a pagina principal');
});

router.get('/login', function (req, res) {
  res.send('esta é a pagina de login');
});

router.post('/login', new AuthController().login);

//Terminar e documentar endpoint posteriormente
router.get('/v1/check', (req: Request, res: Response) => {
  res.send('Cadastro concluido!');
});

export default router;
