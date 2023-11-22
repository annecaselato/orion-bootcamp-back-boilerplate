import { Router, Request, Response } from 'express';
import { validationField, Validator } from './validator/userValidator';
import { UserController } from './controller/UserController';
import { AuthController } from './controller/AuthController';
import { authenticateToken } from './middleware/AuthMiddleware';
import { CharacterController } from './controller/CharacterController';

const router = Router();

//garantir apenas acesso autenticado à dashboard
router.all('/v1/dashboard', authenticateToken, (req, res) => {
  res.sendStatus(200);
});

router.post('/v1/login', new AuthController().login);

router.post(
  '/v1/signup',
  validationField,
  Validator,
  new UserController().create
);

router.get('/v1/check', new AuthController().confirmRegistration);

router.get(
  '/v1/favorites',
  authenticateToken,
  new CharacterController().getFavoritesPage
);

router.get(
  '/v1/favorite/:character_id',
  authenticateToken,
  new CharacterController().favoriteCharacter
);

router.get(
  '/v1/:category',
  authenticateToken,
  new CharacterController().getPage
);

//TODO: retornar informações detalhadas sobre o personagem selecionado
router.get(
  '/v1/:category/:category_id',
  authenticateToken,
  new CharacterController().countClick
);

export default router;
