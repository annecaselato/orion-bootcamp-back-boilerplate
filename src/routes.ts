import { Router, Request, Response } from 'express';
import { validationField, Validator } from './validator/UserValidator';
import { UserController } from './controller/UserController';
import { AuthController } from './controller/AuthController';
import { authenticateToken } from './middleware/AuthMiddleware';
import MarvelAPIMiddleware from './middleware/MarvelAPIMiddleware';
import TranslatorAPIMiddleware from './middleware/TranslatorAPIMiddleware';
import MarvelTranslateController from './controller/MarvelTranslateController';

const router = Router();

//garantir apenas acesso autenticado à dashboard
router.all('/v1/dashboard', authenticateToken, (req, res) => {
  res.sendStatus(200);
});

//TODO: colocar middleware de autenticação
router.get('/v1/getCharacters/:page', (req, res, next) => {
  const page: number = Number(req.params.page) || 1;

  new MarvelAPIMiddleware().getCharacters(req, res, page, () => {
    new TranslatorAPIMiddleware().translateCharacters(req, res, (error) => {
      new MarvelTranslateController().viewCharacters(error, req, res);
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
