import { Router } from 'express';
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

export default router;
