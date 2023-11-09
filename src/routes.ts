import { Router, Request, Response } from 'express';
import { validationField, Validator } from './validator/UserValidator';
import { UserController } from './controller/UserController';
import { AuthController } from './controller/AuthController';
import { authenticateToken } from './middleware/AuthMiddleware';
import { CharacterController } from './controller/CharacterController';

const router = Router();

//garantir apenas acesso autenticado à dashboard
router.all('/v1/dashboard', authenticateToken, (req, res) => {
  res.sendStatus(200);
});

//TODO: colocar middleware de autenticação, criar controller
router.get(
  '/v1/getCharacters/:page',
  authenticateToken,
  new CharacterController().getCharactersPage
);

//TODO: retornar informações detalhadas sobre o personagem selecionado
router.get(
  '/v1/select/:character_id',
  authenticateToken,
  new CharacterController().countClick
);

router.post('/v1/login', new AuthController().login);

router.post(
  '/v1/signUp',
  validationField,
  Validator,
  new UserController().create
);

router.get('/v1/check', new AuthController().confirmRegistration);
export default router;