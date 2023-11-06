import { Router, Request, Response } from 'express';
import { validationField, Validator } from './validator/UserValidator';
import { UserController } from './controller/UserController';
import { AuthController } from './controller/AuthController';
import { authenticateToken } from './middleware/AuthMiddleware';
import CharactersMiddleware from './middleware/CharactersMiddleware';
import TranslateMiddleware from './middleware/TranslateMiddleware';
import CharactersController from './controller/CharactersController';

const router = Router();

//garantir apenas acesso autenticado à dashboard
router.all('/v1/dashboard', authenticateToken, (req, res) => {
  res.sendStatus(200);
});

//TODO: colocar middleware de autenticação
router.get('/v1/getCharacters/:page', (req, res, next) => {
  const page: number = Number(req.params.page) || 1;

  new CharactersMiddleware().getCharacters(req, res, page, () => {
    new TranslateMiddleware().translateCharacters(req, res, (error) => {
      new CharactersController().viewCharacters(error, req, res);
    });
  });
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
