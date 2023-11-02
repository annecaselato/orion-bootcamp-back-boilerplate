import { Router, Request, Response } from 'express';
import { validationField, Validator } from './validator/UserValidator';
import { UserController } from './controller/UserController';
import { AuthController } from './controller/AuthController';
import { authenticateToken } from './middleware/AuthMiddleware';
import MarvelAPIHandler from './marvelUtils/MarvelAPIHandler';

const router = Router();

//garantir apenas acesso autenticado à dashboard
router.all('/v1/dashboard', authenticateToken, (req, res) => {
  res.sendStatus(200);
});

router.get('/v1/getCharacters/:offset/:limit', (req, res) => {
  const offset: number = Number(req.params.offset) || 0;
  const limit: number = Number(req.params.limit) || 20;

  MarvelAPIHandler.getCharacters(req, res, limit, offset);
});

router.post('/v1/login', new AuthController().login);

router.post(
  '/v1/signUp',
  validationField,
  Validator,
  new UserController().create
);

router.get('/v1/check', new AuthController().confirmRegistration);

export default router;
