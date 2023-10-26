import { Router, Request, Response } from 'express';
import { AuthController } from './controller/AuthController';

const router = Router();

router.get('/', function (req: Request, res: Response) {
  res.send('esta é a pagina principal');
});

router.get('/login', function (req: Request, res: Response) {
  res.send('esta é a pagina de login');
});

router.post('/login', new AuthController().login);

router.get('/v1/check', new AuthController().confirmRegistration);

export default router;
