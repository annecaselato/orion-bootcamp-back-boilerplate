import { Router, Request, Response } from 'express';
import { validationField, Validator } from './validator/UserValidator';
import { UserController } from './controller/UserController';
import { AuthController } from './controller/AuthController';
import { authenticateToken } from './middleware/AuthMiddleware';

const router = Router();

router.get('/', function (req, res) {
  res.send('esta é a pagina principal');
});

router.get('/login', function (req, res) {
  res.send('esta é a pagina de login');
});

router.post('/login', new AuthController().login);

router.post(
  '/v1/signUp',
  validationField,
  Validator,
  new UserController().create
);

router.get('/v1/check', new AuthController().confirmRegistration);

export default router;
