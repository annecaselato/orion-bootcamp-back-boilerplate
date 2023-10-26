import { Router } from 'express';
import { HomeController } from './controller/HomeController';
import { AuthController } from './controller/AuthController';
import { authenticateToken } from './middleware/AuthMiddleware';

const router = Router();

router.get('/', function (req, res) {
  res.send('esta é a pagina principal');
});

router.get('/recurso-protegido', authenticateToken, (req, res) => {
  const userInfo = req.body.user;
  res.send(
    'esta é uma pagina protegida.<br>informações do usuario:<br>' + userInfo
  );
});

router.get('/login', function (req, res) {
  res.send('esta é a pagina de login');
});

router.post('/login', new AuthController().login);

export default router;
